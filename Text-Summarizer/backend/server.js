const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');  // Import CORS
const app = express();
const port = 5000;

// Use CORS middleware
app.use(cors());
app.use(bodyParser.json());

const HF_API_KEY = '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';  // Replace with your Hugging Face API key

app.post('/summarize', async (req, res) => {
    try {
      const { text } = req.body;
  
      if (!text || text.trim() === "") {
        return res.status(400).json({ error: "Text is required for summarization" });
      }

      // Make request to Hugging Face API
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/facebook/bart-large-cnn', 
        { inputs: text },
        {
          headers: {
            Authorization: `Bearer ${HF_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Check if summary is returned
      if (response.data && response.data[0].summary_text) {
        return res.json({ summary: response.data[0].summary_text });
      } else {
        throw new Error('No summary returned from Hugging Face API');
      }
    } catch (err) {
      console.error("Error during summarization:", err); // Log error details
      res.status(500).json({ error: "Internal Server Error", message: err.message }); // Send 500 status with error message
    }
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
