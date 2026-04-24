import { ProcessBottleneck } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function BottleneckCard({ item }: { item: ProcessBottleneck }) {
  return (
    <Card className="border-rose-500/20 bg-rose-500/5">
      <CardContent className="p-3 text-sm">
        <div className="flex items-center justify-between">
          <p className="font-medium">{item.node}</p>
          <Badge variant="danger">瓶颈</Badge>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">平均耗时 {item.avgDays} 天 · 影响流程 {item.affectedFlows} 条</p>
        <p className="mt-2 text-xs text-muted-foreground">{item.issue}</p>
      </CardContent>
    </Card>
  );
}
