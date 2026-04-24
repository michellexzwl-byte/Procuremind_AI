"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Sheet } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

const commandItems = [
  { title: "总览首页", route: "/dashboard" },
  { title: "对话工作台", route: "/chat" },
  { title: "知识助手", route: "/knowledge" },
  { title: "任务助手", route: "/tasks" },
  { title: "决策助手", route: "/decision" },
  { title: "Agent广场", route: "/agents" },
  { title: "平台底座", route: "/platform" }
];

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [keyword, setKeyword] = useState("");

  const results = useMemo(
    () => commandItems.filter((item) => item.title.includes(keyword) || item.route.includes(keyword.toLowerCase())),
    [keyword]
  );

  return (
    <Sheet open={open} onClose={onClose} side="right">
      <h3 className="text-lg font-semibold">命令面板</h3>
      <p className="mt-1 text-sm text-muted-foreground">快速跳转到工作台模块</p>
      <Input className="mt-4" placeholder="输入页面名称或路由..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      <div className="mt-4 space-y-2">
        {results.map((item) => (
          <Link key={item.route} href={item.route} onClick={onClose} className="block rounded-lg border p-3 text-sm hover:bg-accent">
            <p className="font-medium">{item.title}</p>
            <p className="text-xs text-muted-foreground">{item.route}</p>
          </Link>
        ))}
      </div>
    </Sheet>
  );
}
