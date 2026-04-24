"use client";

import type React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  side?: "right" | "left";
  className?: string;
  children: React.ReactNode;
}

export function Sheet({ open, onClose, side = "right", className, children }: SheetProps) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            className="fixed inset-0 z-40 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            initial={{ x: side === "right" ? 420 : -420, opacity: 0.6 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: side === "right" ? 420 : -420, opacity: 0.6 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={cn(
              "fixed top-0 z-50 h-full w-full max-w-md border-l bg-card p-5 shadow-2xl",
              side === "right" ? "right-0" : "left-0 border-l-0 border-r",
              className
            )}
          >
            {children}
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
