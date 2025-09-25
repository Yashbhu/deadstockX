// frontend/components/AddInventoryForm.tsx
import { useState } from "react";
import { Card, Input, Textarea, Button, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui";
import { toast } from "sonner";
import { Plus, Package } from "lucide-react";

interface Item {
  name: string;
  category: string;
  quantity: string;
  buyingPrice: string;
  sellingPrice: string;
  location: string;
  description: string;
}

export const AddInventoryForm = () => {
  const [supplier, setSupplier] = useState("");
  const [items, setItems] = useState<Item[]>([
    { name: "", category: "", quantity: "", buyingPrice: "", sellingPrice: "", location: "", description: "" }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleItemChange = (index: number, field: keyof Item, value: string) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addItemRow = () => {
    setItems([...items, { name: "", category: "", quantity: "", buyingPrice: "", sellingPrice: "", location: "", description: "" }]);
  };

  const removeItemRow = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supplier || items.some(item => !item.name || !item.quantity || !item.sellingPrice)) {
      toast.error("Supplier and required fields in all items must be filled.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        file_url: "manual-entry",
        supplier,
        items: items.map(item => ({
          name: item.name,
          category: item.category || "other",
          quantity: Number(item.quantity),
          buyingPrice: Number(item.buyingPrice || 0),
          sellingPrice: Number(item.sellingPrice),
          location: item.location,
          description: item.description,
          supplier
        }))
      };

      const response = await fetch("http://127.0.0.1:8000/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);

      toast.success(`Invoice added! ID: ${data.invoice_id}`);
      setSupplier("");
      setItems([{ name: "", category: "", quantity: "", buyingPrice: "", sellingPrice: "", location: "", description: "" }]);
    } catch (err) {
      toast.error("Failed to add inventory.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="glass-card p-6">
      <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
        <Package className="h-5 w-5 text-primary" /> Add Inventory
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input placeholder="Supplier *" value={supplier} onChange={(e) => setSupplier(e.target.value)} />
        {items.map((item, idx) => (
          <div key={idx} className="border p-4 rounded space-y-2 relative">
            {items.length > 1 && <Button size="sm" variant="destructive" className="absolute top-2 right-2" onClick={() => removeItemRow(idx)}>Remove</Button>}
            <Input placeholder="Item Name *" value={item.name} onChange={(e) => handleItemChange(idx, "name", e.target.value)} />
            <Select value={item.category} onValueChange={(v) => handleItemChange(idx, "category", v)}>
              <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
                <SelectItem value="home">Home & Garden</SelectItem>
                <SelectItem value="books">Books</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Input type="number" placeholder="Quantity *" value={item.quantity} onChange={(e) => handleItemChange(idx, "quantity", e.target.value)} />
            <Input type="number" placeholder="Buying Price" value={item.buyingPrice} onChange={(e) => handleItemChange(idx, "buyingPrice", e.target.value)} />
            <Input type="number" placeholder="Selling Price *" value={item.sellingPrice} onChange={(e) => handleItemChange(idx, "sellingPrice", e.target.value)} />
            <Input placeholder="Location" value={item.location} onChange={(e) => handleItemChange(idx, "location", e.target.value)} />
            <Textarea placeholder="Description" value={item.description} onChange={(e) => handleItemChange(idx, "description", e.target.value)} />
          </div>
        ))}
        <Button type="button" onClick={addItemRow}>Add Another Item</Button>
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Adding..." : "Add Inventory"}</Button>
      </form>
    </Card>
  );
};
