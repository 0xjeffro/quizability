"use client";

import { Paper, QuestionGroup, MCQQuestion, type PaperTheme } from "@/components/paper";
import type { ParsedQuizData } from "@/lib/quizParser";

interface PreviewPanelProps {
  theme: PaperTheme;
  setTheme: (theme: PaperTheme) => void;
  zoom: number;
  setZoom: (fn: (z: number) => number) => void;
  quizData: ParsedQuizData;
}

export function PreviewPanel({ theme, setTheme, zoom, setZoom, quizData }: PreviewPanelProps) {
  return (
    <div
      className="flex-1 flex flex-col overflow-hidden"
      style={{
        background: "#efeef3",
        backgroundImage: "radial-gradient(circle, #d4d4d4 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    >
      {/* Preview Toolbar */}
      <div
        className="h-9 flex items-center justify-between px-3 border-b shrink-0"
        style={{ background: "rgba(250,250,250,0.85)", backdropFilter: "blur(10px)", borderColor: "rgba(0,0,0,0.08)" }}
      >
        <div className="flex items-center gap-1">
          <button className="w-7 h-7 flex items-center justify-center rounded text-[#666] hover:bg-black/5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </button>
          <button className="w-7 h-7 flex items-center justify-center rounded text-[#666] hover:bg-black/5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
            </svg>
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setZoom((z) => Math.max(25, z - 10))}
            className="w-7 h-7 flex items-center justify-center rounded text-[#666] hover:bg-black/5"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <span className="w-12 text-center text-[12px] text-[#666]">{zoom}%</span>
          <button
            onClick={() => setZoom((z) => Math.min(200, z + 10))}
            className="w-7 h-7 flex items-center justify-center rounded text-[#666] hover:bg-black/5"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Theme + Fullscreen */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5 p-0.5 rounded" style={{ background: "rgba(0,0,0,0.05)" }}>
            {(["paper", "dark", "compact"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-2 py-0.5 text-[11px] rounded-sm transition-all capitalize ${
                  theme === t
                    ? "bg-white text-[#1c1c1e] shadow-sm"
                    : "text-[#888] hover:text-[#444]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <button className="w-7 h-7 flex items-center justify-center rounded text-[#666] hover:bg-black/5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Preview Body */}
      <div className="flex-1 overflow-auto">
        <div
          className="flex justify-center py-6"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top center",
          }}
        >
          <Paper theme={theme} className="mx-0">
            {quizData.error ? (
              <div className="py-8 text-center">
                <p className="text-red-500 font-medium mb-2">YAML Parse Error</p>
                <p className="text-[13px] font-mono" style={{ color: "var(--paper-text-muted)" }}>
                  {quizData.error}
                </p>
              </div>
            ) : (
              <>
                <header
                  className="mb-8 pb-6"
                  style={{ borderBottom: "1px solid var(--paper-border)" }}
                >
                  <h2 className="text-2xl font-semibold mb-2">{quizData.title}</h2>
                  {quizData.description && (
                    <p style={{ color: "var(--paper-text-muted)" }}>
                      {quizData.description}
                    </p>
                  )}
                </header>

                {quizData.sections.map((section, sectionIndex) => (
                  <QuestionGroup
                    key={sectionIndex}
                    title={section.title}
                    subtitle={section.subtitle}
                  >
                    {section.questions.map((q) => (
                      <MCQQuestion key={q.questionNumber} {...q} />
                    ))}
                  </QuestionGroup>
                ))}

                {quizData.sections.length === 0 && (
                  <p className="text-center py-8" style={{ color: "var(--paper-text-muted)" }}>
                    Start typing questions in the editor...
                  </p>
                )}
              </>
            )}
          </Paper>
        </div>
      </div>
    </div>
  );
}
