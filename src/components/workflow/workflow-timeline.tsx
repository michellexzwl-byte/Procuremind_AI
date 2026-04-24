import { CheckCircle2, CircleDot, Clock3, AlertTriangle, FileWarning } from "lucide-react";
import { WorkflowNode } from "@/types";
import { cn } from "@/lib/utils";

const statusMap = {
  done: { icon: CheckCircle2, tone: "text-emerald-500", bg: "bg-emerald-500/15", text: "已完成" },
  todo: { icon: Clock3, tone: "text-slate-500", bg: "bg-slate-500/10", text: "待处理" },
  risk: { icon: AlertTriangle, tone: "text-amber-500", bg: "bg-amber-500/15", text: "风险" },
  missing: { icon: FileWarning, tone: "text-rose-500", bg: "bg-rose-500/15", text: "缺失材料" }
} as const;

export function WorkflowTimeline({ nodes, activeId }: { nodes: WorkflowNode[]; activeId?: string }) {
  return (
    <div className="space-y-5">
      {nodes.map((node, index) => {
        const status = statusMap[node.status];
        const Icon = status.icon;
        const active = node.id === activeId;
        return (
          <div key={node.id} className="relative flex gap-3">
            {index < nodes.length - 1 ? <div className="absolute left-4 top-8 h-[calc(100%-10px)] w-px bg-border" /> : null}
            <div className={cn("relative z-10 rounded-full p-2", status.bg, active && "ring-2 ring-primary/40")}>
              <Icon className={cn("h-4 w-4", status.tone)} />
            </div>
            <div className="flex-1 rounded-lg border bg-background p-3">
              <div className="flex items-center justify-between">
                <p className="font-medium">{node.name}</p>
                <span className="text-xs text-muted-foreground">{status.text}</span>
              </div>
              <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                <span>负责人：{node.owner}</span>
                <span>截止：{node.deadline}</span>
              </div>
            </div>
          </div>
        );
      })}
      <div className="flex items-center gap-2 rounded-lg border border-dashed p-3 text-xs text-muted-foreground">
        <CircleDot className="h-4 w-4" />
        AI将根据材料完整性实时更新节点状态与审批建议。
      </div>
    </div>
  );
}
