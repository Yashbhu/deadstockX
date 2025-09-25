from db import supabase

def insert_invoice(file_url=None, supplier=None, items=None):
   
    if not supplier or not items:
        raise ValueError("Supplier and items are required")

    try:
        # Insert invoice
        invoice_resp = supabase.table("invoices").insert({
            "file_url": file_url,
            "supplier": supplier
        }).execute()

        if not invoice_resp.data:
            raise ValueError("Invoice insertion failed")

        invoice_id = invoice_resp.data[0]["id"]

        # Attach invoice_id to each item
        for item in items:
            item["invoice_id"] = invoice_id

        # Insert invoice items
        items_resp = supabase.table("invoice_items").insert(items).execute()

        if not items_resp.data:
            # Rollback invoice if item insert fails
            supabase.table("invoices").delete().eq("id", invoice_id).execute()
            raise ValueError("Invoice items insertion failed, invoice rolled back")

        # Return full invoice + items
        return {
            "invoice": invoice_resp.data[0],
            "items": items_resp.data
        }

    except Exception as e:
        print("Error inserting invoice:", e)
        raise e
