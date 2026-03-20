"use client";

import { cn } from "@/lib/utils";
import "./themes.css";

export type PaperTheme = "paper" | "dark" | "compact";

interface PaperProps {
  theme: PaperTheme;
  children: React.ReactNode;
  className?: string;
}

export function Paper({ theme, children, className }: PaperProps) {
  return (
    <div
      data-paper-theme={theme}
      className={cn(
        "w-[210mm] min-h-[297mm] mx-auto shadow-lg rounded-sm p-12",
        className
      )}
      style={{
        backgroundColor: "var(--paper-bg)",
        color: "var(--paper-text)",
        fontFamily: "var(--paper-font)",
      }}
    >
      {children}
    </div>
  );
}
