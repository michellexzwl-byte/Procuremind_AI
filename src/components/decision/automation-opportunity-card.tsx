import { AutomationOpportunity } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

export function AutomationOpportunityCard({ item }: { item: AutomationOpportunity }) {
  return (
    <Card className="border-cyan-500/20 bg-cyan-500/5">
      <CardContent className="p-3 text-sm">
        <p className="font-medium">{item.title}</p>
        <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
        <p className="mt-2 text-xs text-cyan-700 dark:text-cyan-300">{item.impact}</p>
      </CardContent>
    </Card>
  );
}
