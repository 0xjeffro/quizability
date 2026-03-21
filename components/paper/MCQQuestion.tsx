"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { cn } from "@/lib/utils";

const OPTION_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface MCQQuestionProps {
  questionNumber: number;
  question: string;
  options: string[];
  className?: string;
}

export function MCQQuestion({
  questionNumber,
  question,
  options,
  className,
}: MCQQuestionProps) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className={cn("mb-8", className)}>
      {/* Question text */}
      <div className="flex gap-2 mb-4">
        <span
          className="font-bold shrink-0"
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
        {options.map((option, index) => (
          <MCQOptionItem
            key={index}
            letter={OPTION_LETTERS[index]}
            content={option}
            selected={selected === index}
            onClick={() => setSelected(index)}
          />
        ))}
      </div>
    </div>
  );
}

interface MCQOptionItemProps {
  letter: string;
  content: string;
  selected: boolean;
  onClick: () => void;
}

function MCQOptionItem({ letter, content, selected, onClick }: MCQOptionItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-start gap-2 text-left transition-colors cursor-pointer"
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
      {/* Radio indicator + Letter - vertically centered together */}
      <span className="shrink-0 flex items-center gap-1.5 pt-0.5">
        <span
          className="rounded-full flex items-center justify-center"
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
        <strong style={{ color: "var(--paper-text)" }}>{letter}.</strong>
      </span>

      {/* Option text content */}
      <div className="flex-1" style={{ color: "var(--paper-text)" }}>
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            p({ children }) {
              return <p className="mb-1 last:mb-0">{children}</p>;
            },
            code({ className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const isInline = !match;
              return isInline ? (
                <code
                  className="px-1 py-0.5 rounded text-[13px] font-mono"
                  style={{ backgroundColor: "var(--paper-code-bg, rgba(0,0,0,0.05))" }}
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
                    margin: "0.5rem 0",
                    borderRadius: "0.375rem",
                    fontSize: "13px",
                  }}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </button>
  );
}
