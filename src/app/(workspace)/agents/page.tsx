"use client";

import { useState } from "react";
import { agents } from "@/mock/data";
import { AgentCard } from "@/components/agents/agent-card";
import { PageSectionHeader } from "@/components/shared/page-section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { AgentItem } from "@/types";
import { useProcureStore } from "@/store/use-procure-store";

export default function AgentsPage() {
  const [selected, setSelected] = useState<AgentItem | null>(null);
  const { addRecentScenario } = useProcureStore();

  return (
    <div className="space-y-5">
      <PageSectionHeader title="场景广场 / Agent广场" subtitle="企业采购场景化智能体入口，支持预览与一键进入" badge="智能体市场" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {agents
          .filter((agent) => !agent.name.includes("流程判定"))
          .map((agent) => (
          <div
            key={agent.id}
            onClick={() =>
              addRecentScenario({
                id: agent.id + Date.now().toString(),
                title: agent.name,
                route: "/agents",
                usedAt: new Date().toISOString()
              })
            }
          >
            <AgentCard agent={agent} onPreview={setSelected} />
          </div>
          ))}
      </div>

      <Sheet open={Boolean(selected)} onClose={() => setSelected(null)}>
        {selected ? (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">{selected.name}</h3>
            <p className="text-sm text-muted-foreground">{selected.description}</p>
            <div className="flex flex-wrap gap-2">
              {selected.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="text-sm">绑定知识库：{selected.knowledgeBases.join(" / ")}</p>
            <p className="text-sm">工具：{selected.tools.join(" / ")}</p>
            <p className="text-sm">调用次数：{selected.calls}</p>
            <Button className="w-full" onClick={() => (window.location.href = "/chat")}>
              立即使用
            </Button>
          </div>
        ) : null}
      </Sheet>
    </div>
  );
}
