const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Load environment variables from the root .env for local testing
require('dotenv').config({ path: '.env' }); 

const { loadFaqData } = require('./faq_processor');

const app = express();
const PORT = process.env.PORT || 5000;

// --- Configuration ---

if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is not set in environment variables! Server shutting down.");
    process.exit(1);
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// Load FAQ Data (once at server startup)
const contextString = loadFaqData();

if (!contextString) {
    console.error("Server cannot start without FAQ data. Exiting.");
    process.exit(1);
}

// CORS and Middleware
const frontendOrigin = process.env.FRONTEND_URL || 'http://localhost:5173'; 
app.use(cors({ origin: frontendOrigin }));
console.log(`CORS Origin set to: ${frontendOrigin}`);
app.use(bodyParser.json());

// --- Routes ---

app.get('/', (req, res) => {
    res.send('FAQ Bot API is running.');
});

// The main endpoint for the FAQ Bot
app.post('/faq-query', async (req, res) => {
  const { question } = req.body;

  if (!question || question.trim() === '') {
    return res.status(400).json({ error: "Παρακαλώ δώστε μια έγκυρη ερώτηση." });
  }

  const userQuestion = question.trim();

  // Create the Retrieval-Augmented Generation (RAG) Prompt
  const prompt = `
    Είσαι ένας χρήσιμος βοηθός FAQ για το μάθημα Προγραμματισμός.
    Απάντησε στην παρακάτω ερώτηση ΑΠΟΚΛΕΙΣΤΙΚΑ βασιζόμενος στο ΠΑΡΕΧΟΜΕΝΟ ΠΛΑΙΣΙΟ (context).
    Αν η απάντηση δεν υπάρχει στο πλαίσιο, απάντησε "Δεν έχω αρκετές πληροφορίες για να απαντήσω σε αυτή την ερώτηση."
    Κράτησε την απάντηση σου σύντομη και ακριβή.

    Ερώτηση χρήστη: ${userQuestion}

    Πλαίσιο (Context):
    ${contextString}
  `;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text.trim();
    
    res.json({ answer: responseText });
    
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    res.status(500).json({ 
        answer: "Προέκυψε ένα σφάλμα κατά την επικοινωνία με την υπηρεσία AI. Παρακαλώ δοκιμάστε ξανά."
    });
  }
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`FAQ API listening on port ${PORT} with NODE_ENV=${process.env.NODE_ENV}`);
});