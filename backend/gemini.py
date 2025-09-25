import os
from dotenv import load_dotenv
import google.generativeai as genai


load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in .env file!")


genai.configure(api_key=GEMINI_API_KEY)

def get_model(prefer_flash=False):
    """Return Gemini model instance."""
    try:
        if prefer_flash:
            return genai.GenerativeModel("gemini-1.5-flash")
        return genai.GenerativeModel("gemini-1.5-pro")
    except Exception as e:
        print(" Falling back to Gemini Flash due to:", e)
        return genai.GenerativeModel("gemini-1.5-flash")

def nl_to_sql(user_query: str) -> str:
    """Convert natural language query to SQL."""
    prompt = f"""
    You are an AI that converts natural language queries into SQL.
    Schema:
    products(id, sku, name),
    inventory(product_id, stock_on_hand).

    Only return SQL. No explanation.
    Query: {user_query}
    """
    model = get_model()
    sql_query = model.generate_content(prompt).text.strip()
    return sql_query
