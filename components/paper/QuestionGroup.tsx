"use client";

import { cn } from "@/lib/utils";

interface QuestionGroupProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function QuestionGroup({
  title,
  subtitle,
  children,
  className,
}: QuestionGroupProps) {
  return (
    <section className={cn("mb-10", className)}>
      {/* Group Header */}
      <div
        className="mb-6 pb-3"
        style={{ borderBottom: "1px solid var(--paper-border)" }}
      >
        <h3
          className="text-lg font-semibold"
          style={{ color: "var(--paper-text)" }}
        >
          {title}
        </h3>
        {subtitle && (
          <p
            className="text-sm mt-1"
            style={{ color: "var(--paper-text-muted)" }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Questions */}
      <div>{children}</div>
    </section>
  );
}
