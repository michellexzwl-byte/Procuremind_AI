"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Blocks,
  Bot,
  ChartNoAxesCombined,
  ChevronLeft,
  ChevronRight,
  CircleUser,
  FileCheck,
  LayoutDashboard,
  MessageSquareText,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useProcureStore } from "@/store/use-procure-store";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "总览", href: "/dashboard", icon: LayoutDashboard },
  { label: "对话工作台", href: "/chat", icon: MessageSquareText },
  { label: "知识助手", href: "/knowledge", icon: Bot },
  { label: "任务助手", href: "/tasks", icon: FileCheck },
  { label: "决策助手", href: "/decision", icon: ChartNoAxesCombined },
  { label: "Agent广场", href: "/agents", icon: Sparkles },
  { label: "平台底座", href: "/platform", icon: Blocks }
];

export function AppSidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar, recentScenarios } = useProcureStore();

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r bg-card/80 backdrop-blur-sm transition-all",
        sidebarCollapsed ? "w-[84px]" : "w-[250px]"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b px-3">
        <div className={cn("flex items-center gap-2 overflow-hidden", sidebarCollapsed && "justify-center")}>
          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            <Sparkles className="h-4 w-4" />
          </div>
          {!sidebarCollapsed ? (
            <div>
              <p className="text-sm font-semibold">ProcureMind AI</p>
              <p className="text-xs text-muted-foreground">采购AI助手</p>
            </div>
          ) : null}
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={toggleSidebar}>
          {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="space-y-1 p-3">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex h-10 items-center gap-2 rounded-lg px-3 text-sm transition-colors",
                  active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  sidebarCollapsed && "justify-center px-0"
                )}
              >
                <Icon className="h-4 w-4" />
                {!sidebarCollapsed ? item.label : null}
              </Link>
            );
          })}
        </nav>
        {!sidebarCollapsed ? (
          <div className="mx-3 mt-4 rounded-lg border bg-muted/30 p-3">
            <p className="text-xs font-semibold text-muted-foreground">最近使用场景</p>
            <div className="mt-2 space-y-1">
              {recentScenarios.length ? (
                recentScenarios.map((s) => (
                  <Link key={s.id} href={s.route} className="block truncate text-xs text-foreground/80 hover:text-primary">
                    {s.title}
                  </Link>
                ))
              ) : (
                <p className="text-xs text-muted-foreground">暂无记录</p>
              )}
            </div>
          </div>
        ) : null}
      </div>
      <div className="p-3">
        <button className="flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-xs text-muted-foreground hover:bg-accent">
          <CircleUser className="h-4 w-4" />
          {!sidebarCollapsed ? "采购中心管理员" : null}
        </button>
      </div>
    </aside>
  );
}
