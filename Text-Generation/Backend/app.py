from flask import Flask, render_template, request, jsonify
from model import generate_text  # Import the text generation function

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    prompt = request.form['prompt']
    generated_text = generate_text(prompt)
    return jsonify({'generated_text': generated_text})

if __name__ == '__main__':
    app.run(debug=True)
