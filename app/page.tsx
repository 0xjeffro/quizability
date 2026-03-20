"use client";

import { useState } from "react";
import { Paper, MCQQuestion, type PaperTheme } from "@/components/paper";

const sampleQuestion = {
  questionNumber: 1,
  question:
    "What is the primary purpose of the useEffect hook in React?",
  options: [
    { label: "A. To manage component state", value: "a" },
    { label: "B. To perform side effects in function components", value: "b" },
    { label: "C. To create reusable components", value: "c" },
    { label: "D. To optimize rendering performance", value: "d" },
  ],
};

const sampleQuestion2 = {
  questionNumber: 2,
  question:
    "Which of the following is NOT a valid way to pass data between React components?",
  options: [
    { label: "A. Props", value: "a" },
    { label: "B. Context API", value: "b" },
    { label: "C. Direct DOM manipulation", value: "c" },
    { label: "D. State management libraries", value: "d" },
  ],
};

export default function Home() {
  const [theme, setTheme] = useState<PaperTheme>("paper");

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#f8f8f8",
        backgroundImage: "radial-gradient(circle, #d1d1d1 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* Floating toolbar */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-10">
        <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm shadow-lg rounded-full px-2 py-1.5 border border-zinc-200/50">
          {(["paper", "dark", "compact"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`px-4 py-1.5 text-sm rounded-full transition-all capitalize ${
                theme === t
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main content area */}
      <main className="pt-24 pb-16 px-4">
        <Paper theme={theme}>
          <header
            className="mb-8 pb-6"
            style={{ borderBottom: "1px solid var(--paper-border)" }}
          >
            <h2 className="text-2xl font-semibold mb-2">
              React Fundamentals Quiz
            </h2>
            <p style={{ color: "var(--paper-text-muted)" }}>
              Answer the following questions to test your React knowledge.
            </p>
          </header>

          <MCQQuestion {...sampleQuestion} />
          <MCQQuestion {...sampleQuestion2} />
        </Paper>
      </main>
    </div>
  );
}
