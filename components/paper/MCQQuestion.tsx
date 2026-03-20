"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
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
        <div className="prose prose-sm max-w-none" style={{ color: "var(--paper-text)" }}>
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                const isInline = !match;
                return isInline ? (
                  <code
                    className="px-1.5 py-0.5 rounded text-[13px] font-mono"
                    style={{
                      backgroundColor: "var(--paper-code-bg, rgba(0,0,0,0.05))",
                    }}
                    {...props}
                  >
                    {children}
                  </code>
                ) : (
                  <SyntaxHighlighter
                    style={oneLight}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      margin: "0.75rem 0",
                      borderRadius: "0.375rem",
                      fontSize: "13px",
                    }}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                );
              },
              p({ children }) {
                return <p className="mb-2 last:mb-0">{children}</p>;
              },
            }}
          >
            {question}
          </ReactMarkdown>
        </div>
      </div>

      {/* Options */}
      <div
        className="flex flex-wrap pl-5"
        style={{
          flexDirection: "var(--paper-option-direction)" as "row" | "column",
          gap: "var(--paper-option-gap)",
        }}
      >
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
      className="flex items-center gap-2 text-left transition-colors cursor-pointer"
      style={{
        padding: "var(--paper-option-padding)",
        backgroundColor: selected
          ? "var(--paper-option-bg-selected)"
          : "var(--paper-option-bg)",
        borderWidth: "var(--paper-option-border-width)",
        borderStyle: "solid",
        borderColor: selected
          ? "var(--paper-option-border-selected)"
          : "var(--paper-option-border)",
        borderRadius: "var(--paper-option-radius)",
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
      <span style={{ color: "var(--paper-text)" }}>
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            p({ children }) {
              return <>{children}</>;
            },
            code({ children, ...props }) {
              return (
                <code
                  className="px-1 py-0.5 rounded text-[13px] font-mono"
                  style={{ backgroundColor: "var(--paper-code-bg, rgba(0,0,0,0.05))" }}
                  {...props}
                >
                  {children}
                </code>
              );
            },
          }}
        >
          {label}
        </ReactMarkdown>
      </span>
    </button>
  );
}
