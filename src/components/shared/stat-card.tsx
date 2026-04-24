import { TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({ label, value, trend }: { label: string; value: string | number; trend: number }) {
  const positive = trend >= 0;
  return (
    <Card className="transition-all hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">{value}</div>
        <div className={cn("mt-2 flex items-center gap-1 text-xs", positive ? "text-emerald-600" : "text-rose-600")}>
          {positive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
          {Math.abs(trend)}% 较昨日
        </div>
      </CardContent>
    </Card>
  );
}
