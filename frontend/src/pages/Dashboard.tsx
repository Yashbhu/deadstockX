import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { AIInsights } from "@/components/ai/AIInsights";
import { FileUpload } from "@/components/inventory/FileUpload";
import { AddInventoryForm } from "@/components/inventory/AddInventoryForm";
import { TrendingUp, AlertTriangle, DollarSign, Package, Upload } from "lucide-react";
import heroImage from "@/assets/dashboard-hero.jpg";
import InventoryChatbot from './InventoryChatbot/page';

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [inventoryMode, setInventoryMode] = useState<"ocr" | "manual" | null>(null);
  

  useEffect(() => {
    const tab = searchParams.get("tab");
    const mode = searchParams.get("mode") as "ocr" | "manual" | null;
    
    if (tab) {
      setActiveTab(tab);
    }
    if (mode) {
      setInventoryMode(mode);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#053721] to-[#E8EEA5]">
      {/* Header with friendly greeting */}
      <header className=" p-6 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white drop-shadow-lg">Here's your inventory health today</h1>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Button 
                variant={activeTab === "dashboard" ? "default" : "outline"} 
                onClick={() => setActiveTab("dashboard")} 
                className={`transition-all duration-300 ${
                  activeTab === "dashboard" 
                    ? "bg-green-700 hover:bg-green-600 text-white shadow-lg" 
                    : "bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                }`}
              >
                Dashboard
              </Button>
              <Button 
                variant={activeTab === "addinventory" ? "default" : "outline"} 
                onClick={() => setActiveTab("addinventory")} 
                className={`transition-all duration-300 ${
                  activeTab === "addinventory" 
                    ? "bg-green-700 hover:bg-green-600 text-white shadow-lg" 
                    : "bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                }`}
              >
                Add Inventory
              </Button>
              <Button 
                variant={activeTab === "seeinventory" ? "default" : "outline"} 
                onClick={() => setActiveTab("seeinventory")} 
                className={`transition-all duration-300 ${
                  activeTab === "seeinventory" 
                    ? "bg-green-700 hover:bg-green-600 text-white shadow-lg" 
                    : "bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                }`}
              >
                See Inventory
              </Button>
              <Button 
                variant={activeTab === "insights" ? "default" : "outline"} 
                onClick={() => setActiveTab("insights")} 
                className={`transition-all duration-300 ${
                  activeTab === "insights" 
                    ? "bg-green-700 hover:bg-green-600 text-white shadow-lg" 
                    : "bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                }`}
              >
                Insights
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <DashboardMetrics />
            
            {/* Quick Action Hero */}
            <Card className="backdrop-blur-md bg-white/95 shadow-2xl border border-white/20 hover:shadow-green-500/20 transition-all duration-300 hover:scale-[1.02] overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-2xl font-bold text-green-800">
                      Free Cash Now
                    </h2>
                  </div>
                  <p className="text-green-700/80 mb-6">
                    I've found Rs 12,450 you can recover this week by liquidating slow-moving inventory.
                    Ready to turn dead stock into cash? 
                  </p>
                  <Button onClick={() => setActiveTab("insights")}  className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-lg hover:shadow-green-500/30 transition-all duration-300">
                    Show Me How
                  </Button>
                </div>
                <div className="md:w-1/3 h-48 md:h-auto">
                  <img src={heroImage} alt="AI Dashboard" className="w-full h-full object-cover opacity-90" />
                </div>
              </div>
            </Card>

            {/* Dead Stock Alerts */}
            <Card className="backdrop-blur-md bg-white/95 shadow-2xl border border-white/20 p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <h3 className="text-xl font-semibold text-green-800">
                  Stock Going Dead Soon
                </h3>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Denim Jeans - Blue (Size M)", days: 8, risk: "high" },
                  { name: "Summer T-Shirts Pack", days: 15, risk: "medium" },
                  { name: "Winter Jackets XL", days: 22, risk: "low" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-green-50/70 backdrop-blur-sm border border-green-100/50">
                    <div>
                      <p className="font-medium text-green-800">{item.name}</p>
                      <p className="text-sm text-green-600/70">
                        {item.days} days until dead stock
                      </p>
                    </div>
                    <Badge 
                      variant={item.risk === "high" ? "destructive" : "secondary"}
                      className={
                        item.risk === "high" 
                          ? "bg-red-100 text-red-800 border-red-200" 
                          : item.risk === "medium" 
                            ? "bg-amber-100 text-amber-800 border-amber-200" 
                            : "bg-green-100 text-green-800 border-green-200"
                      }
                    >
                      {item.risk === "high" ? "Act Now" : item.risk === "medium" ? "Watch" : "Monitor"}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === "seeinventory" && (
          <div className="space-y-6">
            <div className="backdrop-blur-md bg-white/95 shadow-2xl border border-white/20 rounded-lg">
              <InventoryTable />
            </div>
          </div>
        )}

        
            {activeTab === "addinventory" && (
              <div className="space-y-6">
                {inventoryMode === "manual" && (
                  <div className="backdrop-blur-md bg-white/95 shadow-2xl border border-white/20 rounded-lg">
                    <AddInventoryForm />
                  </div>
                )}
                {inventoryMode === "ocr" && (
                  <div className="backdrop-blur-md bg-white/95 shadow-2xl border border-white/20 rounded-lg">
                    <FileUpload />
                  </div>
                )}
                {!inventoryMode && (
                  <>
                    <div className="backdrop-blur-md bg-white/95 shadow-2xl border border-white/20 rounded-lg">
                      <AddInventoryForm />
                    </div>
                    <div className="backdrop-blur-md bg-white/95 shadow-2xl border border-white/20 rounded-lg">
                      <FileUpload />
                    </div>
                  </>
                )}
              </div>
        )}

        {activeTab === "insights" && (
          <div className="backdrop-blur-md bg-white/95 shadow-2xl border border-white/20 rounded-lg">
            <AIInsights />
          </div>
        )}

        <div className="mt-8">
          <InventoryChatbot />
        </div>

      </main>
    </div>
  );
};

export default Dashboard;