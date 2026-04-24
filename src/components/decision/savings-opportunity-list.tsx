import { CostOpportunity } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function SavingsOpportunityList({
  opportunities,
  onAction
}: {
  opportunities: CostOpportunity[];
  onAction: (action: string) => void;
}) {
  return (
    <div className="space-y-2">
      {opportunities.map((item) => (
        <div key={item.id} className="rounded-lg border bg-emerald-500/5 p-3 text-sm">
          <div className="flex items-center justify-between gap-2">
            <p className="font-medium">{item.title}</p>
            <span className="text-xs text-emerald-700">预计节省 {formatCurrency(item.estimatedSavings)}</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
          <Button size="sm" variant="outline" className="mt-2 h-7 text-xs" onClick={() => onAction(item.action)}>
            {item.action}
          </Button>
        </div>
      ))}
    </div>
  );
}
