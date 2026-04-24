import { contractRisks } from "@/mock/data";
import { RiskBadge } from "@/components/shared/risk-badge";

export function ContractRiskList() {
  return (
    <div className="space-y-3">
      {contractRisks.map((item) => (
        <div key={item.id} className="rounded-lg border bg-background p-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">{item.clause}</h4>
            <RiskBadge risk={item.risk} />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">问题：{item.issue}</p>
          <p className="mt-1 text-sm">建议：{item.suggestion}</p>
        </div>
      ))}
    </div>
  );
}
