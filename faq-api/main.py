import os
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from google.genai.errors import APIError
from dotenv import load_dotenv

from faq_processor import load_faq_data

load_dotenv(override=True) 

# --- Configuration & Initialization ---
app = FastAPI(
    title="FAQ Bot API",
    description="Backend for the Prog Intro Lectures FAQ Bot using Gemini.",
)

# Load context string
CONTEXT_STRING = load_faq_data()
if not CONTEXT_STRING:
    print("Warning: FAQ data not loaded. /faq-query will return an error.")

# Initialize Gemini Client
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
AI_CLIENT = None
GEMINI_MODEL = "gemini-2.5-flash" 

if not GEMINI_API_KEY:
    print("Warning: GEMINI_API_KEY not set. API will not be able to process queries.")
else:
    try:
        AI_CLIENT = genai.Client()
        print("Gemini client initialized successfully.")
    except Exception as e:
        print(f"Error initializing Gemini client: {e}")
        AI_CLIENT = None

# CORS Configuration
FRONTEND_URL = os.getenv('FRONTEND_URL', 'http://localhost:5173')
print(f"CORS Origin set to: {FRONTEND_URL}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

# --- Pydantic Models for Request Body ---
class QuestionBody(BaseModel):
    question: str

# --- Routes ---

@app.get('/')
async def root():
    """Simple health check endpoint."""
    return {"message": "FAQ Bot API is running."}

@app.post('/faq-query')
async def faq_query(body: QuestionBody):
    """
    The main endpoint for the FAQ Bot, implementing Retrieval-Augmented Generation (RAG).
    """
    if not AI_CLIENT or not CONTEXT_STRING:
        # 503 Service Unavailable if key or context is missing
        raise HTTPException(
            status_code=503, 
            detail="Server not fully configured (GEMINI_API_KEY or FAQ data missing)."
        )

    user_question = body.question.strip()

    if not user_question:
        raise HTTPException(
            status_code=400, 
            detail="Παρακαλώ δώστε μια έγκυρη ερώτηση."
        )

    # Create the RAG Prompt
    prompt = f"""
    Είσαι ένας χρήσιμος βοηθός FAQ για το μάθημα Προγραμματισμός.
    Απάντησε στην παρακάτω ερώτηση ΑΠΟΚΛΕΙΣΤΙΚΑ βασιζόμενος στο ΠΑΡΕΧΟΜΕΝΟ ΠΛΑΙΣΙΟ (context).
    Αν η απάντηση δεν υπάρχει στο πλαίσιο, απάντησε "Δεν έχω αρκετές πληροφορίες για να απαντήσω σε αυτή την ερώτηση."
    Κράτησε την απάντηση σου σύντομη και ακριβή.

    Ερώτηση χρήστη: {user_question}

    Πλαίσιο (Context):
    {CONTEXT_STRING}
    """

    try:
        # Using the synchronous call as generate_content is internally fast and thread-safe in FastAPI
        response = AI_CLIENT.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt
        )
        
        response_text = response.text.strip()
        
        return {"answer": response_text}
        
    except APIError as e:
        print(f"Gemini API Error: {e}")
        raise HTTPException(
            status_code=500, 
            detail="Προέκυψε ένα σφάλμα κατά την επικοινωνία με την υπηρεσία AI. Παρακαλώ δοκιμάστε ξανά."
        )
    except Exception as e:
        print(f"Internal Server Error: {e}")
        # Log the full exception but return a generic message to the user
        raise HTTPException(
            status_code=500, 
            detail="Ένα απροσδόκητο σφάλμα συνέβη στον server."
        )

# --- Entry Point for running with uvicorn ---
if __name__ == '__main__':
    API_HOST = os.getenv("API_HOST", "0.0.0.0") 
    PORT = int(os.getenv("PORT", 5000))

    import uvicorn
    uvicorn.run(
        "main:app", 
        host=API_HOST, 
        port=PORT, 
        reload=True, 
        log_level="info", 
        # Only works if run from the faq_api directory, or adjust import/path
    )