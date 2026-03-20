"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface MCQOption {
  label: string;
  value: string;
}

interface MCQQuestionProps {
  questionNumber: number;
  question: string;
  options: MCQOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function MCQQuestion({
  questionNumber,
  question,
  options,
  value,
  onChange,
  className,
}: MCQQuestionProps) {
  const [selected, setSelected] = useState(value);

  const handleSelect = (optionValue: string) => {
    setSelected(optionValue);
    onChange?.(optionValue);
  };

  return (
    <div className={cn("mb-8", className)}>
      {/* Question text */}
      <div className="flex gap-2 mb-4">
        <span
          className="font-medium shrink-0"
          style={{ color: "var(--paper-text)" }}
        >
          {questionNumber}.
        </span>
        <p style={{ color: "var(--paper-text)" }}>{question}</p>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-2 pl-5">
        {options.map((option) => (
          <MCQOptionItem
            key={option.value}
            label={option.label}
            selected={selected === option.value}
            onClick={() => handleSelect(option.value)}
          />
        ))}
      </div>
    </div>
  );
}

interface MCQOptionItemProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

function MCQOptionItem({ label, selected, onClick }: MCQOptionItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-md text-left transition-colors cursor-pointer"
      )}
      style={{
        backgroundColor: selected
          ? "var(--paper-option-bg-selected)"
          : "var(--paper-option-bg)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: selected
          ? "var(--paper-option-border-selected)"
          : "var(--paper-option-border)",
      }}
    >
      {/* Radio indicator */}
      <span
        className="shrink-0 rounded-full flex items-center justify-center"
        style={{
          width: "var(--paper-radio-size)",
          height: "var(--paper-radio-size)",
          borderWidth: "2px",
          borderStyle: "solid",
          borderColor: selected
            ? "var(--paper-radio-border-selected)"
            : "var(--paper-radio-border)",
        }}
      >
        {selected && (
          <span
            className="rounded-full"
            style={{
              width: "calc(var(--paper-radio-size) - 8px)",
              height: "calc(var(--paper-radio-size) - 8px)",
              backgroundColor: "var(--paper-radio-fill)",
            }}
          />
        )}
      </span>

      {/* Option text */}
      <span style={{ color: "var(--paper-text)" }}>{label}</span>
    </button>
  );
}
