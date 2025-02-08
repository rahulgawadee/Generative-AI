import streamlit as st
import pandas as pd
import numpy as np
import os
from gtts import gTTS
import base64
import time
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

# Function to play text as audio
def play_audio(text):
    try:
        tts = gTTS(text=text, lang='en')
        tts.save("output.mp3")
        audio_file = open("output.mp3", "rb").read()
        b64 = base64.b64encode(audio_file).decode()
        audio_html = f"""
            <audio autoplay>
                <source src="data:audio/mp3;base64,{b64}" type="audio/mp3">
            </audio>
        """
        st.markdown(audio_html, unsafe_allow_html=True)
        os.remove("output.mp3")
    except Exception as e:
        st.error(f"Error generating speech: {str(e)}")

# Load Data
training = pd.read_csv('./data/Training.csv')
severity_data = pd.read_csv('./data/symptom_severity.csv')
description_data = pd.read_csv('./data/symptom_Description.csv')
precaution_data = pd.read_csv('./data/symptom_precaution.csv')

cols = training.columns[:-1]
X = training[cols]
y = training['prognosis']
le = LabelEncoder()
y = le.fit_transform(y)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

# Dictionaries for severity, descriptions, and precautions
severity_dict = dict(zip(severity_data.iloc[:, 0], severity_data.iloc[:, 1]))
description_dict = dict(zip(description_data.iloc[:, 0], description_data.iloc[:, 1]))
precaution_dict = {k: [p for p in v if isinstance(p, str) and p.lower() != 'nan'] for k, v in zip(precaution_data.iloc[:, 0], precaution_data.iloc[:, 1:].values.tolist())}

# Streamlit App
st.title("AI Health Assistant 🤖💊")

# Initialize session state
if "step" not in st.session_state:
    st.session_state.step = 1
if "name" not in st.session_state:
    st.session_state.name = ""
if "symptoms" not in st.session_state:
    st.session_state.symptoms = []
if "num_days" not in st.session_state:
    st.session_state.num_days = 0
if "diagnosed" not in st.session_state:
    st.session_state.diagnosed = False
if "symptom_index" not in st.session_state:
    st.session_state.symptom_index = 0

# Step 1: Get user's name
if st.session_state.step == 1:
    name = st.text_input("What is your full name?")
    if st.button("Next") and name:
        st.session_state.name = name
        play_audio(f"Hello {name}, let's begin the diagnosis.")
        st.session_state.step = 2
        st.rerun()

# Step 2: Yes/No symptom questioning
elif st.session_state.step == 2:
    if st.session_state.symptom_index < 7:
        symptom = cols[st.session_state.symptom_index].replace('_', ' ')
        response = st.radio(f"Do you have {symptom}?", ("Yes", "No"))
        if st.button("Next"):
            if response == "Yes":
                st.session_state.symptoms.append(cols[st.session_state.symptom_index])
            st.session_state.symptom_index += 1
            st.rerun()
    else:
        st.session_state.step = 3
        st.rerun()

# Step 3: Ask duration
elif st.session_state.step == 3:
    num_days = st.number_input("For how many days have you experienced these symptoms?", min_value=1, step=1)
    if st.button("Get Diagnosis"):
        st.session_state.num_days = num_days
        st.session_state.step = 4
        st.rerun()

# Step 4: Diagnosis and results
elif st.session_state.step == 4 and not st.session_state.diagnosed:
    input_vector = np.zeros(len(cols))
    for symptom in st.session_state.symptoms:
        if symptom in cols:
            input_vector[list(cols).index(symptom)] = 1
    prediction_proba = clf.predict_proba([input_vector])[0]
    top_3_indices = np.argsort(prediction_proba)[-3:][::-1]
    top_3_diseases = le.inverse_transform(top_3_indices)
    confidence_scores = prediction_proba[top_3_indices] * 100

    st.write("### Prediction Results")
    for i in range(3):
        disease = top_3_diseases[i]
        confidence = confidence_scores[i]
        disease_desc = description_dict.get(disease, "No description available.")
        precautions = precaution_dict.get(disease, ["No specific precautions available."])
        st.write(f"**{disease}** - Confidence: {confidence:.2f}%")
        st.write(f"📌 **Description:** {disease_desc}")
        st.write("🛑 **Precautions:**")
        for j, p in enumerate(precautions):
            st.write(f"{j+1}. {p}")
    
    # Severity-Based Risk Analysis
    severity_score = sum(severity_dict.get(s, 0) for s in st.session_state.symptoms) * st.session_state.num_days / (len(st.session_state.symptoms) + 1)
    if severity_score > 13:
        st.warning("⚠ You should consult a doctor immediately!")
    else:
        st.info("✅ Your condition does not seem severe, but take precautions.")
    
    # Visualization
    st.write("### Confidence Score Distribution")
    fig, ax = plt.subplots()
    sns.barplot(x=top_3_diseases, y=confidence_scores, palette="coolwarm", ax=ax)
    ax.set_xlabel("Diseases")
    ax.set_ylabel("Confidence Score (%)")
    ax.set_title("Top 3 Predictions")
    st.pyplot(fig)
    
    result_text = f"{st.session_state.name}, the top prediction is {top_3_diseases[0]} with {confidence_scores[0]:.2f}% confidence."
    play_audio(result_text)
    
    st.session_state.diagnosed = True

# Restart Button
if st.session_state.step == 4:
    if st.button("Restart"):
        st.session_state.clear()
        st.rerun()