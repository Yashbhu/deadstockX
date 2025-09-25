// frontend/components/InventoryTable.tsx
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Edit3, Trash2 } from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  age: number;
  price: number;
  status: "healthy" | "at-risk" | "dead";
}

export const InventoryTable = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Fetch low-stock items from backend
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/low-stock");
        const data = await res.json();
        const items: InventoryItem[] = data.products.map((item: any) => ({
          id: item.id,
          name: item.name ?? "Unknown",
          quantity: item.quantity ?? item.stock_on_hand ?? 0,
          age: item.age ?? 0,
          price: item.price ?? 0,
          status: item.status ?? (item.stock_on_hand < 5 ? "dead" : item.stock_on_hand < 10 ? "at-risk" : "healthy")
        }));
        setInventory(items);
      } catch (err) {
        console.error("Failed to fetch inventory:", err);
      }
    };
    fetchInventory();
  }, []);

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) setSelectedItems(filteredInventory.map(i => i.id));
    else setSelectedItems([]);
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) setSelectedItems([...selectedItems, id]);
    else setSelectedItems(selectedItems.filter(item => item !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "bg-green-100 text-green-800";
      case "at-risk": return "bg-yellow-100 text-yellow-800";
      case "dead": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="glass-card p-6">
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <Input
          placeholder="Search inventory..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 mb-2 sm:mb-0"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2">
                <Checkbox
                  checked={selectedItems.length === filteredInventory.length && filteredInventory.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Quantity</th>
              <th className="p-2 text-left">Age (Days)</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  No inventory items found.
                </td>
              </tr>
            ) : (
              filteredInventory.map(item => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={(val) => handleSelectItem(item.id, val as boolean)}
                    />
                  </td>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.quantity}</td>
                  <td className={`p-2 ${item.age > 45 ? "text-red-600" : item.age > 20 ? "text-yellow-600" : "text-green-600"}`}>{item.age}</td>
                  <td className="p-2">Rs {item.price}</td>
                  <td className="p-2"><Badge className={getStatusColor(item.status)}>{item.status}</Badge></td>
                  <td className="p-2 flex gap-2">
                    <Button variant="ghost" size="sm"><Edit3 className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4" /></Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
