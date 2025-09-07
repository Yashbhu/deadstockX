from db import supabase

def insert_invoice(file_url, supplier, items):
    # Insert invoice
    invoice = supabase.table("invoices").insert({
        "file_url": file_url,
        "supplier": supplier
    }).execute()

    invoice_id = invoice.data[0]["id"]

    # Add invoice_id to items
    for item in items:
        item["invoice_id"] = invoice_id

    supabase.table("invoice_items").insert(items).execute()
    return invoice_id