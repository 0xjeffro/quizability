"use client";

import { useRef } from "react";

interface EditorPanelProps {
  content: string;
  onChange: (content: string) => void;
  hasError?: boolean;
  width: string;
}

const toolbarButtons = [
  { label: "B", style: "font-bold" },
  { label: "I", style: "italic" },
  { label: "U", style: "underline" },
  { label: "H", style: "" },
  { label: "≡", style: "" },
  { label: "</>", style: "font-mono text-[10px]" },
];

export function EditorPanel({ content, onChange, hasError = false, width }: EditorPanelProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const lineCount = content.split("\n").length;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div className="flex flex-col shrink-0" style={{ width }}>
      {/* Editor Toolbar */}
      <div
        className="h-9 flex items-center gap-1 px-2 border-b shrink-0"
        style={{ background: "#fafafa", borderColor: "rgba(0,0,0,0.08)" }}
      >
        {toolbarButtons.map((btn, i) => (
          <button
            key={i}
            className={`w-7 h-7 flex items-center justify-center rounded text-[13px] text-[#444] hover:bg-black/5 ${btn.style}`}
          >
            {btn.label}
          </button>
        ))}
        <div className="w-px h-4 bg-black/10 mx-1" />
        <button className="w-7 h-7 flex items-center justify-center rounded text-[13px] text-[#444] hover:bg-black/5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </button>
        <div className="flex-1" />
        <span className={`text-[11px] px-1.5 py-0.5 rounded font-medium ${hasError ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-700"}`}>
          YAML
        </span>
      </div>

      {/* Editor Body */}
      <div className="flex-1 flex overflow-hidden" style={{ background: "#fff" }}>
        {/* Line Numbers */}
        <div
          ref={lineNumbersRef}
          className="w-12 py-3 pr-3 text-right overflow-hidden select-none shrink-0"
          style={{ background: "#fafafa", borderRight: "1px solid rgba(0,0,0,0.06)" }}
        >
          {lineNumbers.map((num) => (
            <div key={num} className="text-[13px] leading-[1.7] text-[#999] font-mono">
              {num}
            </div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          className="flex-1 py-3 px-4 font-mono text-[13px] leading-[1.7] resize-none focus:outline-none"
          style={{ color: "#1c1c1e" }}
          spellCheck={false}
        />
      </div>
    </div>
  );
}
