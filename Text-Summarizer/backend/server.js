const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();  // Import dotenv to load environment variables

const app = express();
const port = 5000;

// Use CORS middleware
app.use(cors());
app.use(bodyParser.json());

// Get the Hugging Face API Key from environment variables
const HF_API_KEY = process.env.HF_API_KEY;

app.post('/summarize', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "Text is required for summarization" });
    }

    // Make a request to Hugging Face API for summarization
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
      {
        inputs: text,
      },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
        },
      }
    );

    if (response.data && response.data[0].summary_text) {
      return res.json({ summary: response.data[0].summary_text });
    } else {
      throw new Error('No summary returned');
    }
  } catch (err) {
    console.error("Error during summarization:", err);
    res.status(500).json({ error: "Internal Server Error", message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
