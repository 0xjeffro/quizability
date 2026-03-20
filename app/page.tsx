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
        backgroundColor: "#efeef3",
        backgroundImage:
          "radial-gradient(circle, #c8c7cc 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      {/* Floating toolbar */}
      <div className="fixed top-5 left-0 right-0 flex justify-center z-10 pointer-events-none">
          <div
            className="flex items-center gap-0.5 p-0.5 rounded pointer-events-auto"
            style={{
              background: "rgba(251, 251, 253, 0.8)",
              backdropFilter: "saturate(180%) blur(20px)",
              WebkitBackdropFilter: "saturate(180%) blur(20px)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.06)",
            }}
          >
            {(["paper", "dark", "compact"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-3 py-1 text-[13px] rounded-sm transition-all capitalize ${
                  theme === t
                    ? "bg-white text-[#1c1c1e]"
                    : "text-[#8e8e93] hover:text-[#3a3a3c]"
                }`}
                style={
                  theme === t
                    ? { boxShadow: "0 1px 2px rgba(0,0,0,0.06)" }
                    : {}
                }
              >
                {t}
              </button>
            ))}
          </div>
        </div>

      {/* Main content area */}
      <main className="pt-20 pb-16 px-4">
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
