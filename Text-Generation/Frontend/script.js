document.getElementById('promptForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const prompt = document.getElementById('prompt').value;

    fetch('/generate', {
        method: 'POST',
        body: new URLSearchParams({
            'prompt': prompt
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('generatedText').textContent = data.generated_text;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
