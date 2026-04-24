"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { RecentScenario } from "@/types";

type ChatMode = "knowledge" | "document" | "workflow" | "decision";

interface ProcureState {
  sidebarCollapsed: boolean;
  quickTaskOpen: boolean;
  chatMode: ChatMode;
  recentScenarios: RecentScenario[];
  favoriteTemplates: string[];
  toggleSidebar: () => void;
  setQuickTaskOpen: (open: boolean) => void;
  setChatMode: (mode: ChatMode) => void;
  addRecentScenario: (scenario: RecentScenario) => void;
  toggleFavoriteTemplate: (id: string) => void;
}

export const useProcureStore = create<ProcureState>()(
  persist(
    (set, get) => ({
      sidebarCollapsed: false,
      quickTaskOpen: false,
      chatMode: "knowledge",
      recentScenarios: [],
      favoriteTemplates: ["pt-1"],
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setQuickTaskOpen: (open) => set({ quickTaskOpen: open }),
      setChatMode: (mode) => set({ chatMode: mode }),
      addRecentScenario: (scenario) => {
        const next = [scenario, ...get().recentScenarios.filter((item) => item.route !== scenario.route)].slice(0, 6);
        set({ recentScenarios: next });
      },
      toggleFavoriteTemplate: (id) => {
        const current = get().favoriteTemplates;
        set({
          favoriteTemplates: current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
        });
      }
    }),
    {
      name: "procuremind-store"
    }
  )
);
