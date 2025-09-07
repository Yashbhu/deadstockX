import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, DollarSign, Package, AlertTriangle, Target } from "lucide-react";

const metrics = [
  {
    title: "Total Inventory Value",
    value: "Rs 147,230",
    change: "+2.4%",
    trend: "up",
    icon: DollarSign,
    gradient: "bg-gradient-primary"
  },
  {
    title: "Stock at Risk",
    value: "23%",
    change: "-1.2%",
    trend: "down",
    icon: AlertTriangle,
    gradient: "bg-gradient-hero"
  },
  {
    title: "Cash Recoverable",
    value: "Rs 12,450",
    change: "This Week",
    trend: "neutral",
    icon: Target,
    gradient: "bg-gradient-success"
  },
  {
    title: "Active Products",
    value: "1,247",
    change: "+15 new",
    trend: "up",
    icon: Package,
    gradient: "bg-gradient-primary"
  }
];

export const DashboardMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const isPositive = metric.trend === "up";
        const isNegative = metric.trend === "down";
        
        return (
          <Card key={index} className="glass-card hover-lift p-6 relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {metric.value}
                </p>
                <div className="flex items-center gap-1">
                  {isPositive && <TrendingUp className="h-4 w-4 text-success" />}
                  {isNegative && <TrendingDown className="h-4 w-4 text-destructive" />}
                  <span className={`text-sm ${
                    isPositive ? "text-success" : 
                    isNegative ? "text-destructive" : 
                    "text-muted-foreground"
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${metric.gradient} shadow-soft`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};