"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Sheet } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useProcureStore } from "@/store/use-procure-store";

export function QuickTaskModal() {
  const { quickTaskOpen, setQuickTaskOpen } = useProcureStore();
  const [project, setProject] = useState("");
  const [budget, setBudget] = useState("");

  return (
    <Sheet open={quickTaskOpen} onClose={() => setQuickTaskOpen(false)}>
      <h3 className="text-lg font-semibold">快速创建采购任务</h3>
      <p className="mt-1 text-sm text-muted-foreground">用于演示任务快速建单能力</p>
      <div className="mt-4 space-y-3">
        <Input placeholder="采购项目名称" value={project} onChange={(e) => setProject(e.target.value)} />
        <Input placeholder="预算金额（元）" value={budget} onChange={(e) => setBudget(e.target.value)} />
        <Textarea placeholder="补充说明：用途、紧急程度、交付要求" />
        <Button
          className="w-full"
          onClick={() => {
            toast.success("已创建任务草稿", { description: `${project || "未命名项目"} / 预算 ${budget || "待补充"}` });
            setQuickTaskOpen(false);
            setProject("");
            setBudget("");
          }}
        >
          创建草稿
        </Button>
      </div>
    </Sheet>
  );
}
