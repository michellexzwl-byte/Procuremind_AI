import { RiskLevel } from "@/types";
import { Badge } from "@/components/ui/badge";

const mapping: Record<RiskLevel, { text: string; variant: "success" | "warning" | "danger" }> = {
  low: { text: "低风险", variant: "success" },
  medium: { text: "中风险", variant: "warning" },
  high: { text: "高风险", variant: "danger" },
  critical: { text: "关键风险", variant: "danger" }
};

export function RiskBadge({ risk }: { risk: RiskLevel }) {
  return <Badge variant={mapping[risk].variant}>{mapping[risk].text}</Badge>;
}
