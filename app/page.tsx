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

const quizzes = [
  { id: 1, title: "React Fundamentals", questions: 10, active: true },
  { id: 2, title: "TypeScript Basics", questions: 8, active: false },
  { id: 3, title: "Next.js Routing", questions: 5, active: false },
];

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
      {/* Sidebar - iOS style */}
      <aside
        className="fixed left-0 top-0 bottom-0 w-72 p-3 z-20"
        style={{
          background: "rgba(251, 251, 253, 0.72)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          borderRight: "0.5px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-3 py-3 mb-2">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(180deg, #3a3a3c 0%, #1c1c1e 100%)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            }}
          >
            <span className="text-white text-sm font-semibold">Q</span>
          </div>
          <span className="font-semibold text-[#1c1c1e] text-[17px]">
            Quizability
          </span>
        </div>

        {/* Search Bar */}
        <div className="px-2 mb-3">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{ background: "rgba(118, 118, 128, 0.12)" }}
          >
            <svg
              className="w-4 h-4 text-[#8e8e93]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="text-[#8e8e93] text-[15px]">Search</span>
          </div>
        </div>

        {/* New Quiz Button */}
        <div className="px-2 mb-2">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[15px] text-[#007aff] hover:bg-white/50 active:bg-white/70 transition-all active:scale-[0.98]">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(0, 122, 255, 0.1)" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            New Quiz
          </button>
        </div>

        {/* Section Label */}
        <div className="px-4 py-2">
          <span className="text-[13px] font-medium text-[#8e8e93]">
            Recent
          </span>
        </div>

        {/* Quiz List */}
        <nav className="px-2 space-y-0.5">
          {quizzes.map((quiz) => (
            <a
              key={quiz.id}
              href="#"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[15px] transition-all active:scale-[0.98] ${
                quiz.active
                  ? "bg-white/90 shadow-sm"
                  : "hover:bg-white/50 active:bg-white/70"
              }`}
              style={quiz.active ? { boxShadow: "0 1px 3px rgba(0,0,0,0.06)" } : {}}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(118, 118, 128, 0.08)" }}
              >
                <svg
                  className="w-4 h-4 text-[#8e8e93]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className={`truncate ${quiz.active ? "text-[#1c1c1e]" : "text-[#3a3a3c]"}`}>
                  {quiz.title}
                </div>
                <div className="text-[13px] text-[#8e8e93]">
                  {quiz.questions} questions
                </div>
              </div>
            </a>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-3 left-3 right-3">
          <div
            className="mx-2 mb-3"
            style={{ height: "0.5px", background: "rgba(0, 0, 0, 0.1)" }}
          />
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[15px] text-[#3a3a3c] hover:bg-white/50 active:bg-white/70 transition-all active:scale-[0.98]"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(118, 118, 128, 0.08)" }}
            >
              <svg
                className="w-4 h-4 text-[#8e8e93]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            Settings
          </a>
        </div>
      </aside>

      {/* Main Area */}
      <div className="pl-72">
        {/* Floating toolbar - iOS pill style */}
        <div className="fixed top-5 left-72 right-0 flex justify-center z-10 pointer-events-none">
          <div
            className="flex items-center gap-1 p-1 rounded-full pointer-events-auto"
            style={{
              background: "rgba(251, 251, 253, 0.72)",
              backdropFilter: "saturate(180%) blur(20px)",
              WebkitBackdropFilter: "saturate(180%) blur(20px)",
              boxShadow: "0 1px 4px rgba(0,0,0,0.08), 0 0 0 0.5px rgba(0,0,0,0.08)",
            }}
          >
            {(["paper", "dark", "compact"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-5 py-2 text-[15px] rounded-full transition-all active:scale-[0.96] capitalize ${
                  theme === t
                    ? "bg-white text-[#1c1c1e] shadow-sm"
                    : "text-[#8e8e93] hover:text-[#3a3a3c]"
                }`}
                style={
                  theme === t
                    ? { boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }
                    : {}
                }
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Main content area */}
        <main className="pt-24 pb-16 px-8">
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
    </div>
  );
}
