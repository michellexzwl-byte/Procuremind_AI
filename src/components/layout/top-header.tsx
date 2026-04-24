"use client";

import { Bell, Command, Plus, Search } from "lucide-react";
import { useProcureStore } from "@/store/use-procure-store";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TopHeader({ onOpenCommand }: { onOpenCommand: () => void }) {
  const { setQuickTaskOpen } = useProcureStore();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-5 backdrop-blur">
      <div className="relative w-full max-w-xl">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="全局搜索：流程、制度、Agent、模板" className="pl-9" />
      </div>
      <div className="ml-4 flex items-center gap-2">
        <Badge variant="outline">采购中心</Badge>
        <Badge variant="info">Demo</Badge>
        <Button variant="outline" size="sm" className="gap-1" onClick={onOpenCommand}>
          <Command className="h-3.5 w-3.5" />
          Cmd/Ctrl + K
        </Button>
        <Button size="sm" className="gap-1" onClick={() => setQuickTaskOpen(true)}>
          <Plus className="h-3.5 w-3.5" />
          快速创建任务
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Bell className="h-4 w-4" />
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
}
