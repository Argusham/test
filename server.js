// server.js
import express from 'express';
import bodyParser from 'body-parser';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant that helps users when making web applications" },
        { role: "user", content: userMessage },
      ],
      model: "gpt-4",
    });

    res.json({ botResponse: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while fetching the response.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
