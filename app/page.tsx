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
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900">
      {/* Navigation - uses global styles */}
      <nav className="sticky top-0 z-10 bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Quizability
          </h1>

          {/* Theme toggle - uses global styles */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              Paper Theme:
            </span>
            <div className="flex gap-1 bg-zinc-100 dark:bg-zinc-700 p-1 rounded-lg">
              {(["paper", "dark", "compact"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors capitalize ${
                    theme === t
                      ? "bg-white dark:bg-zinc-600 text-zinc-900 dark:text-white shadow-sm"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content area */}
      <main className="py-8 px-4">
        {/* Paper component - isolated theme */}
        <Paper theme={theme}>
          <header className="mb-8 pb-6" style={{ borderBottom: "1px solid var(--paper-border)" }}>
            <h2 className="text-2xl font-semibold mb-2">React Fundamentals Quiz</h2>
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
