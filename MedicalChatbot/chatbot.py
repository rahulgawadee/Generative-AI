import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn import preprocessing

# Load datasets
training = pd.read_csv("./data/Training.csv")
testing = pd.read_csv("./data/Testing.csv")
description_data = pd.read_csv("./data/symptom_Description.csv")
severity_data = pd.read_csv("./data/symptom_severity.csv")
precaution_data = pd.read_csv("./data/symptom_precaution.csv")

# Prepare data
cols = training.columns[:-1]
x = training[cols]
y = training["prognosis"]
le = preprocessing.LabelEncoder()
y = le.fit_transform(y)
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.3, random_state=42)

# Train the Decision Tree model
clf = DecisionTreeClassifier()
clf.fit(x_train, y_train)

# Create dictionaries
severity_dict = dict(zip(severity_data.iloc[:, 0], severity_data.iloc[:, 1]))

description_dict = dict(zip(description_data.iloc[:, 0], description_data.iloc[:, 1]))

precaution_dict = dict(zip(precaution_data.iloc[:, 0], precaution_data.iloc[:, 1:].values.tolist()))

# Function to get diagnosis
def get_diagnosis(symptoms_input):
    symptoms_dict = {symptom: idx for idx, symptom in enumerate(cols)}
    input_vector = np.zeros(len(symptoms_dict))

    for symptom in symptoms_input.split(","):
        symptom = symptom.strip()
        if symptom in symptoms_dict:
            input_vector[symptoms_dict[symptom]] = 1

    predicted_disease = le.inverse_transform(clf.predict([input_vector]))[0]
    description = description_dict.get(predicted_disease, "No description available.")
    precautions = precaution_dict.get(predicted_disease, ["No precautions available."])

    return predicted_disease, description, precautions
