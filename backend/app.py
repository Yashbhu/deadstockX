from fastapi import FastAPI
from invoices import insert_invoice
from queries import nl_to_sql, get_low_stock_products

app = FastAPI()

@app.post("/invoices")
def create_invoice(invoice: dict):
    invoice_id = insert_invoice(
        invoice["file_url"],
        invoice["supplier"],
        invoice["items"]
    )
    return {"invoice_id": invoice_id}

@app.get("/low-stock")
def low_stock_products():
    return {"products": get_low_stock_products()}

@app.post("/nl-to-sql")
def query_to_sql(query: dict):
    sql = nl_to_sql(query["text"])
    return {"sql": sql}
