from db import get_supabase
from gemini import genai  # import whole lib instead of just model

supabase = get_supabase()

# Prefer PRO, fallback to FLASH
def get_model(prefer_flash=False):
    if prefer_flash:
        return genai.GenerativeModel("gemini-1.5-flash")
    return genai.GenerativeModel("gemini-1.5-pro")

def nl_to_sql(user_query):
    prompt = f"""
    You are an AI that converts natural language queries into SQL.
    Schema:
    products(id, sku, name),
    inventory(product_id, stock_on_hand).

    Only return SQL. No explanation.
    Query: {user_query}
    """

    try:
        model = get_model()
        sql_query = model.generate_content(prompt).text.strip()
    except Exception as e:
        print("⚠️ Falling back to gemini-1.5-flash due to:", e)
        model = get_model(prefer_flash=True)
        sql_query = model.generate_content(prompt).text.strip()

    return sql_query

def get_low_stock_products():
    result = (
        supabase.table("inventory")
        .select("product_id, stock_on_hand")
        .lt("stock_on_hand", 10)
        .execute()
    )
    return result.data
