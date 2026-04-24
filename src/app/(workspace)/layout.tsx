"use client";

import { useEffect, useState } from "react";
import type React from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopHeader } from "@/components/layout/top-header";
import { CommandPalette } from "@/components/layout/command-palette";
import { QuickTaskModal } from "@/components/layout/quick-task-modal";
import { FeedbackModal } from "@/components/shared/feedback-modal";

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const [openCommand, setOpenCommand] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpenCommand((prev) => !prev);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden md:block">
        <AppSidebar />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <TopHeader onOpenCommand={() => setOpenCommand(true)} />
        <main className="flex-1 overflow-y-auto p-5">{children}</main>
      </div>
      <CommandPalette open={openCommand} onClose={() => setOpenCommand(false)} />
      <QuickTaskModal />
      <FeedbackModal />
    </div>
  );
}
