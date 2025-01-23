const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;


app.post("/chat", async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required!" });
    }

    try {
        console.log("Sending message to Hugging Face:", message);
        const response = await axios.post(
            "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
            { inputs: message },
            {
                headers: {
                    Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
                },
            }
        );
        console.log("Hugging Face response:", response.data); // Log entire response for debugging

        // Check if the expected data is present in the response
        const botReply = response.data[0]?.generated_text || "No response from model"; // Adjust for the actual response structure

        if (botReply !== "No response from model") {
            return res.json({ reply: botReply });
        } else {
            return res.status(500).json({ error: "No response from model" });
        }
    } catch (error) {
        console.error("Error communicating with Hugging Face API:", error.message);
        return res.status(500).json({ error: "Something went wrong." });
    }
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
