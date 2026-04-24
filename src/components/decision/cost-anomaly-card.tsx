import { AlertTriangle } from "lucide-react";
import { CostAnomalyCardData } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const levelVariant: Record<CostAnomalyCardData["level"], "success" | "warning" | "danger"> = {
  低: "success",
  中: "warning",
  高: "danger"
};

export function CostAnomalyCard({ item }: { item: CostAnomalyCardData }) {
  return (
    <Card className="border-amber-500/20 bg-amber-500/5">
      <CardContent className="p-4 text-sm">
        <div className="flex items-center justify-between">
          <p className="font-medium">{item.category}</p>
          <Badge variant={levelVariant[item.level]}>{item.level}异常</Badge>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          当前单价 {formatCurrency(item.currentUnitPrice)} · 历史均价 {formatCurrency(item.historicalAvgPrice)}
        </p>
        <p className="mt-1 text-xs text-rose-600">偏差 {item.deviation}%</p>
        <p className="mt-2 flex items-start gap-1 text-xs text-muted-foreground">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 text-amber-500" />
          {item.reason}
        </p>
      </CardContent>
    </Card>
  );
}
