import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { Supplier } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskBadge } from "@/components/shared/risk-badge";

export function SupplierScoreCard({ supplier }: { supplier: Supplier }) {
  const data = [
    { item: "质量", value: supplier.quality },
    { item: "成本", value: supplier.cost },
    { item: "交付", value: supplier.delivery },
    { item: "配合", value: supplier.collaboration }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">{supplier.name}</CardTitle>
          <RiskBadge risk={supplier.risk} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data} outerRadius={60}>
              <PolarGrid />
              <PolarAngleAxis dataKey="item" tick={{ fontSize: 11 }} />
              <Radar dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-muted-foreground">近90天订单 {supplier.recentOrders} 笔</p>
      </CardContent>
    </Card>
  );
}
