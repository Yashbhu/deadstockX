# gemini.py
import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables from .env in the same folder
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

# Get the key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in .env file!")

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)

# Try pro model, fallback to flash if quota is exceeded
try:
    model = genai.GenerativeModel("gemini-1.5-pro")
    print("✅ Using Gemini Pro model")
except Exception as e:
    print("⚠️ Falling back to Gemini Flash due to error:", e)
    model = genai.GenerativeModel("gemini-1.5-flash")
    print("✅ Using Gemini Flash model")
