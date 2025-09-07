import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, DollarSign, TrendingUp, MessageCircle, Download, Zap } from "lucide-react";

const cashRecoveryBundles = [{
  name: "Summer Clearance Bundle",
  items: ["Summer T-Shirts", "Cotton Shorts", "Sandals"],
  originalValue: 3240,
  discountPercent: 25,
  expectedRecovery: 2430,
  confidence: 92
}, {
  name: "Winter Overstock Pack",
  items: ["Winter Jackets", "Wool Scarves", "Boots"],
  originalValue: 5680,
  discountPercent: 35,
  expectedRecovery: 3692,
  confidence: 88
}, {
  name: "Accessories Quick Sale",
  items: ["Leather Bags", "Belts", "Watches"],
  originalValue: 2890,
  discountPercent: 20,
  expectedRecovery: 2312,
  confidence: 95
}];

const pricingExperiments = [{
  discount: 20,
  recovery: 85,
  demand: "High",
  recommended: true
}, {
  discount: 30,
  recovery: 78,
  demand: "Medium",
  recommended: false
}, {
  discount: 40,
  recovery: 65,
  demand: "Low",
  recommended: false
}];

const actionCards = [{
  type: "restock",
  title: "Restock Fast-Sellers",
  description: "Classic Denim Jeans are flying off the shelves! Reorder 50 units.",
  priority: "high",
  impact: "+Rs 3,200 potential revenue"
}, {
  type: "stop",
  title: "Stop Slow Movers",
  description: "Winter Boots haven't sold in 45 days. Consider discontinuing.",
  priority: "medium",
  impact: "-Rs 890 carrying cost saved"
}, {
  type: "promote",
  title: "Promote Mid-Performers",
  description: "Cotton T-Shirts need a boost. Try social media campaign.",
  priority: "low",
  impact: "+Rs 1,500 estimated uplift"
}];

export const AIInsights = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#053721] to-[#E8EEA5]">
      <div className="container mx-auto p-6 space-y-8">
        {/* Hero Section */}
        <Card className="p-8 bg-gradient-to-r from-[#053721]/95 to-[#0a5d3a]/95 backdrop-blur-sm text-white relative overflow-hidden border-0 shadow-2xl">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="h-8 w-8" />
              <h1 className="text-3xl font-bold">AI-Powered Cash Recovery Insights</h1>
            </div>
            <p className="text-xl text-white/90 mb-6">
              We have analyzed your inventory and found smart ways to recover cash and optimize sales!
            </p>
            <div className="flex gap-4">
              <Button className="bg-[#E8EEA5] text-[#053721] hover:bg-[#E8EEA5]/90 shadow-lg">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline" className="border-[#95a01c] hover:bg-[#E8EEA5]/10 text-[#95a01c] hover:text-[#E8EEA5]">
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp Me
              </Button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E8EEA5]/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
        </Card>

        {/* Free Cash Now Widget */}
        <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-[#16a34a] to-[#22c55e] rounded-full shadow-lg">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#053721]">Free Cash Now</h2>
              <p className="text-[#16a34a] font-medium text-lg">Rs 8,434 recoverable this week</p>
            </div>
          </div>

          <div className="grid gap-4">
            {cashRecoveryBundles.map((bundle, index) => (
              <div key={index} className="p-4 rounded-lg bg-gradient-to-r from-[#f0fdf4] to-[#dcfce7] border border-[#16a34a]/20">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-[#053721]">{bundle.name}</h3>
                    <p className="text-sm text-[#053721]/70">
                      {bundle.items.join(", ")}
                    </p>
                  </div>
                  <Badge className="bg-[#16a34a] text-white shadow-sm">
                    {bundle.confidence}% confident
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-[#053721]/60">Original Value</p>
                    <p className="font-semibold text-[#053721]">Rs {bundle.originalValue}</p>
                  </div>
                  <div>
                    <p className="text-[#053721]/60">With {bundle.discountPercent}% Off</p>
                    <p className="font-semibold text-[#16a34a]">Rs {bundle.expectedRecovery}</p>
                  </div>
                  <div className="flex items-end justify-end">
                    <Button size="sm" className="bg-gradient-to-r from-[#16a34a] to-[#22c55e] hover:from-[#15803d] hover:to-[#16a34a] shadow-md">
                      <Zap className="h-4 w-4 mr-1" />
                      Execute
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Dynamic Pricing Experiments */}
        <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-[#053721]" />
            <h2 className="text-xl font-bold text-[#053721]">Dynamic Pricing Sweet Spot</h2>
          </div>
          
          <p className="text-[#053721]/70 mb-6">
            AI analyzed similar products and found your optimal discount rate for maximum recovery.
          </p>

          <div className="grid gap-4">
            {pricingExperiments.map((experiment, index) => (
              <div key={index} className={`p-4 rounded-lg border ${
                experiment.recommended 
                  ? "bg-gradient-to-r from-[#f0fdf4] to-[#dcfce7] border-[#16a34a]/30" 
                  : "bg-gray-50/80 border-gray-200"
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-[#053721]">
                      {experiment.discount}% Discount
                    </span>
                    {experiment.recommended && (
                      <Badge className="bg-[#053721] text-[#E8EEA5] shadow-sm">
                        AI Recommended
                      </Badge>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[#053721]">{experiment.recovery}% Recovery</p>
                    <p className="text-sm text-[#053721]/60">{experiment.demand} Demand</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[#16a34a] to-[#22c55e] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${experiment.recovery}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Action Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {actionCards.map((action, index) => {
            const isPriority = action.priority === "high";
            const isMedium = action.priority === "medium";
            
            return (
              <Card key={index} className={`p-6 bg-white/95 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${
                isPriority ? "ring-2 ring-[#dc2626]/20" : 
                isMedium ? "ring-2 ring-[#f59e0b]/20" : 
                "ring-2 ring-gray-200"
              }`}>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-[#053721] mb-2">
                      {action.title}
                    </h3>
                    <p className="text-sm text-[#053721]/70 mb-3">
                      {action.description}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className={
                        isPriority ? "bg-red-500 text-white" : 
                        isMedium ? "bg-amber-500 text-white" : 
                        "bg-gray-500 text-white"
                      }>
                        {isPriority ? "High Priority" : isMedium ? "Medium" : "Consider"}
                      </Badge>
                    </div>
                    
                    <p className="text-sm font-medium text-[#16a34a]">
                      {action.impact}
                    </p>
                    
                    <Button 
                      className={isPriority 
                        ? "w-full bg-gradient-to-r from-[#053721] to-[#0a5d3a] hover:from-[#042f1a] hover:to-[#053721] text-white shadow-md" 
                        : "w-full border-[#053721] text-[#053721] hover:bg-[#053721] hover:text-white"
                      }
                      variant={isPriority ? "default" : "outline"}
                      size="sm"
                    >
                      Take Action
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};