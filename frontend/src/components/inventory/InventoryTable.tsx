import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, Download, Edit3, Trash2 } from "lucide-react";
import { InventoryItem, getLowStock } from "@/services/api";

export const InventoryTable = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const data = await getLowStock(); 
        setInventory(data.products);
      } catch (error) {
        console.error("Failed to fetch inventory:", error);
      }
    };
    fetchInventory();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "bg-success text-success-foreground";
      case "at-risk": return "bg-warning text-warning-foreground";
      case "dead": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "healthy": return "Healthy";
      case "at-risk": return "At Risk";
      case "dead": return "Dead Stock";
      default: return status;
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) setSelectedItems(inventory.map(i => i.id));
    else setSelectedItems([]);
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) setSelectedItems([...selectedItems, id]);
    else setSelectedItems(selectedItems.filter(item => item !== id));
  };

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="glass-card p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-green-800">Your Inventory</h2>
          <p className="text-green-600">Manage your stock with smart insights and bulk actions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-2" />Filter</Button>
          <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" />Export</Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        {selectedItems.length > 0 && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Edit3 className="h-4 w-4 mr-2" />
              Bulk Edit ({selectedItems.length})
            </Button>
            <Button variant="outline" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected
            </Button>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="p-3">
                <Checkbox
                  checked={selectedItems.length === filteredInventory.length && filteredInventory.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="text-left p-3 font-medium text-muted-foreground">Item Name</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Quantity</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Age (Days)</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Price</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map(item => (
              <tr key={item.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="p-3">
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                  />
                </td>
                <td className="p-3 font-medium text-foreground">{item.name}</td>
                <td className="p-3 text-foreground">{item.quantity}</td>
                <td className={`p-3 font-medium ${item.age > 45 ? "text-destructive" : item.age > 20 ? "text-warning" : "text-success"}`}>
                  {item.age}
                </td>
                <td className="p-3 text-foreground font-medium">Rs {item.price}</td>
                <td className="p-3">
                  <Badge className={getStatusColor(item.status)}>{getStatusText(item.status)}</Badge>
                </td>
                <td className="p-3 flex gap-1">
                  <Button variant="ghost" size="sm"><Edit3 className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredInventory.length === 0 && <p className="text-center py-8 text-muted-foreground">No inventory items found.</p>}
    </Card>
  );
};
