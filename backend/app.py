# backend/app.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from supabase_db import get_supabase
from gemini_config import nl_to_sql

supabase = get_supabase()
app = FastAPI()

# Enable CORS for frontend
origins = ["http://localhost:5173"]  # frontend URL
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- Models --------------------
class InventoryItem(BaseModel):
    name: str
    category: Optional[str] = "other"
    quantity: int
    buyingPrice: float = 0
    sellingPrice: float
    location: Optional[str] = None
    description: Optional[str] = None
    supplier: Optional[str] = "Unknown Supplier"

class InvoicePayload(BaseModel):
    file_url: Optional[str] = None
    supplier: str
    items: List[InventoryItem]

class NLQuery(BaseModel):
    text: str

# -------------------- Endpoints --------------------
@app.post("/invoices")
def create_invoice(invoice: InvoicePayload):
    try:
        # Insert invoice
        invoice_resp = supabase.table("invoices").insert({
            "file_url": invoice.file_url or "manual-entry",
            "supplier": invoice.supplier
        }).execute()

        invoice_id = invoice_resp.data[0]["id"]

        # Insert invoice items
        items_data = [item.dict() | {"invoice_id": invoice_id} for item in invoice.items]
        supabase.table("invoice_items").insert(items_data).execute()

        return {"invoice_id": invoice_id, "items": items_data}
    except Exception as e:
        return {"error": str(e)}

@app.get("/low-stock")
def low_stock_products():
    try:
        result = supabase.table("inventory").select("id, name, stock_on_hand, age, price").lt("stock_on_hand", 10).execute()
        items = []
        for item in result.data:
            status = "healthy"
            if item.get("stock_on_hand", 0) < 5:
                status = "dead"
            elif item.get("stock_on_hand", 0) < 10:
                status = "at-risk"
            items.append({
                "id": item["id"],
                "name": item.get("name", "Unknown"),
                "quantity": item.get("stock_on_hand", 0),
                "age": item.get("age", 0),
                "price": item.get("price", 0),
                "status": status
            })
        return {"products": items}
    except Exception as e:
        return {"error": str(e)}

@app.post("/nl-to-sql")
def query_to_sql(query: NLQuery):
    sql = nl_to_sql(query.text)
    return {"sql": sql}
