import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { AIInsights } from "@/components/ai/AIInsights";
import { FileUpload } from "@/components/inventory/FileUpload";
import { AddInventoryForm } from "@/components/inventory/AddInventoryForm";
import { TrendingUp, AlertTriangle, DollarSign, Package, Upload } from "lucide-react";
import heroImage from "@/assets/dashboard-hero.jpg";
const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  return <div className="min-h-screen bg-background">
      {/* Header with friendly greeting */}
      <header className="glass-card border-b border-glass-border/50 p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Here's your inventory health today</h1>
              
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Button variant={activeTab === "dashboard" ? "default" : "outline"} onClick={() => setActiveTab("dashboard")} className="transition-smooth">Dashboard</Button>
              <Button variant={activeTab === "inventory" ? "default" : "outline"} onClick={() => setActiveTab("inventory")} className="transition-smooth">Inventory</Button>
              <Button variant={activeTab === "insights" ? "default" : "outline"} onClick={() => setActiveTab("insights")} className="transition-smooth">Insights</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        {activeTab === "dashboard" && <div className="space-y-8">
            <DashboardMetrics />
            
            {/* Quick Action Hero */}
            <Card className="glass-card hover-lift overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="h-6 w-6 text-success" />
                    <h2 className="text-2xl font-bold text-foreground">
                      💸 Free Cash Now
                    </h2>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    I've found $12,450 you can recover this week by liquidating slow-moving inventory.
                    Ready to turn dead stock into cash? 
                  </p>
                  <Button className="bg-gradient-success hover:shadow-success text-success-foreground">
                    Show Me How
                  </Button>
                </div>
                <div className="md:w-1/3 h-48 md:h-auto">
                  <img src={heroImage} alt="AI Dashboard" className="w-full h-full object-cover" />
                </div>
              </div>
            </Card>

            {/* Dead Stock Alerts */}
            <Card className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <h3 className="text-xl font-semibold text-foreground">
                  ⚠️ Stock Going Dead Soon
                </h3>
              </div>
              <div className="space-y-3">
                {[{
              name: "Denim Jeans - Blue (Size M)",
              days: 8,
              risk: "high"
            }, {
              name: "Summer T-Shirts Pack",
              days: 15,
              risk: "medium"
            }, {
              name: "Winter Jackets XL",
              days: 22,
              risk: "low"
            }].map((item, index) => <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.days} days until dead stock
                      </p>
                    </div>
                    <Badge variant={item.risk === "high" ? "destructive" : item.risk === "medium" ? "secondary" : "outline"}>
                      {item.risk === "high" ? "🔥 Act Now" : item.risk === "medium" ? "⚠️ Watch" : "👀 Monitor"}
                    </Badge>
                  </div>)}
              </div>
            </Card>
          </div>}

        {activeTab === "inventory" && <div className="space-y-6">
            <AddInventoryForm />
            <FileUpload />
            <InventoryTable />
          </div>}

        {activeTab === "insights" && <AIInsights />}
      </main>
    </div>;
};
export default Index;