"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import yaml from "js-yaml";
import { Paper, QuestionGroup, MCQQuestion, type PaperTheme } from "@/components/paper";

const defaultContent = `title: React Fundamentals Quiz
description: Test your knowledge of React hooks and component patterns.

sections:
  - title: 一、选择题
    subtitle: 每题 5 分，共 20 分
    questions:
      - type: mcq
        question: What is the primary purpose of the \`useEffect\` hook in React?
        options:
          - A. To manage component state
          - B. To perform side effects in function components
          - C. To create reusable components
          - D. To optimize rendering performance
        answer: B

      - type: mcq
        question: Which of the following is NOT a valid way to pass data between React components?
        options:
          - A. Props
          - B. Context API
          - C. Direct DOM manipulation
          - D. State management libraries
        answer: C

  - title: 二、代码分析题
    subtitle: 每题 10 分，共 20 分
    questions:
      - type: mcq
        question: |
          What will be logged to the console when this code runs?

          \`\`\`javascript
          const arr = [1, 2, 3, 4, 5];
          const result = arr.filter(x => x % 2 === 0)
                            .map(x => x * 2);
          console.log(result);
          \`\`\`
        options:
          - A. "[1, 2, 3, 4, 5]"
          - B. "[2, 4]"
          - C. "[4, 8]"
          - D. "[2, 4, 6, 8, 10]"
        answer: C

      - type: mcq
        question: |
          Consider the following React component. What is the issue with this code?

          \`\`\`jsx
          function Counter() {
            const [count, setCount] = useState(0);

            useEffect(() => {
              const timer = setInterval(() => {
                setCount(count + 1);
              }, 1000);
            }, []);

            return <div>{count}</div>;
          }
          \`\`\`
        options:
          - A. Missing cleanup function in useEffect
          - B. count is stale due to closure
          - C. Both A and B
          - D. The code is correct
        answer: C

  - title: 三、数学应用题
    subtitle: 每题 15 分，共 30 分
    questions:
      - type: mcq
        question: |
          已知函数 $f(x) = x^2 + 2x + 1$，求 $f'(x)$ 的值：
        options:
          - A. $2x + 2$
          - B. $2x + 1$
          - C. $x^2 + 2$
          - D. $2x$
        answer: A

      - type: mcq
        question: |
          计算以下定积分的值：

          $$\\int_{0}^{1} x^2 \\, dx$$
        options:
          - A. $\\frac{1}{2}$
          - B. $\\frac{1}{3}$
          - C. $\\frac{1}{4}$
          - D. $1$
        answer: B
`;

interface QuizQuestion {
  type: "mcq" | "fill_blank" | "short_answer";
  question: string;
  options?: string[];
  answer: string;
  explanation?: string;
}

interface QuizSection {
  title: string;
  subtitle?: string;
  questions: QuizQuestion[];
}

interface QuizData {
  title: string;
  description?: string;
  sections: QuizSection[];
}

export default function Home() {
  const [theme, setTheme] = useState<PaperTheme>("paper");
  const [content, setContent] = useState(defaultContent);
  const [zoom, setZoom] = useState(75);
  const [editorWidth, setEditorWidth] = useState(50); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync scroll between textarea and line numbers
  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // Handle divider drag
  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const sidebarWidth = 40; // w-10 = 40px
      const availableWidth = rect.width - sidebarWidth;
      const offsetX = e.clientX - rect.left - sidebarWidth;
      const percentage = Math.min(Math.max((offsetX / availableWidth) * 100, 20), 80);
      setEditorWidth(percentage);
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Calculate line numbers
  const lineCount = content.split("\n").length;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  // Parse YAML content
  const quizData = useMemo(() => {
    let questionCounter = 0;

    const parseQuestion = (q: QuizQuestion) => {
      questionCounter++;
      return {
        questionNumber: questionCounter,
        question: q.question || "",
        type: q.type || "mcq",
        options: (q.options || []).map((opt) => {
          const optStr = String(opt);
          const match = optStr.match(/^([A-Z])\.\s*(.+)/);
          return {
            label: optStr,
            value: match ? match[1].toLowerCase() : optStr,
          };
        }),
        answer: String(q.answer || "").toLowerCase(),
        explanation: q.explanation || "",
      };
    };

    try {
      const parsed = yaml.load(content) as QuizData;
      if (parsed && typeof parsed === "object") {
        return {
          title: parsed.title || "Untitled Quiz",
          description: parsed.description || "",
          sections: (parsed.sections || []).map((section) => ({
            title: section.title || "",
            subtitle: section.subtitle || "",
            questions: (section.questions || []).map(parseQuestion),
          })),
          error: null,
        };
      }
      return { title: "Untitled Quiz", description: "", sections: [], error: null };
    } catch (e) {
      return {
        title: "Untitled Quiz",
        description: "",
        sections: [],
        error: e instanceof Error ? e.message : "Invalid YAML",
      };
    }
  }, [content]);

  return (
    <div className="h-screen flex flex-col bg-[#f5f5f5]">
      {/* Top Menu Bar */}
      <header
        className="h-10 flex items-center justify-between px-3 border-b shrink-0"
        style={{ background: "#fafafa", borderColor: "rgba(0,0,0,0.08)" }}
      >
        {/* Left: Logo + Menus */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-black/5">
              <svg className="w-4 h-4 text-[#666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="font-semibold text-[14px] text-[#1c1c1e]">Quizability</span>
          </div>
          <nav className="flex items-center gap-1">
            {["File", "Edit", "View", "Help"].map((menu) => (
              <button
                key={menu}
                className="px-2 py-1 text-[13px] text-[#444] hover:bg-black/5 rounded"
              >
                {menu}
              </button>
            ))}
          </nav>
        </div>

        {/* Center: Breadcrumb */}
        <div className="flex items-center gap-1 text-[13px] text-[#666]">
          <span>Quizzes</span>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-[#1c1c1e]">react-fundamentals.yaml</span>
        </div>

        {/* Right: Share */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 px-3 py-1 text-[13px] text-[#444] hover:bg-black/5 rounded">
            Share
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div ref={containerRef} className="flex-1 flex overflow-hidden">
        {/* Left Icon Sidebar */}
        <aside
          className="w-10 flex flex-col items-center py-2 border-r shrink-0"
          style={{ background: "#fafafa", borderColor: "rgba(0,0,0,0.08)" }}
        >
          <div className="flex-1 flex flex-col items-center gap-1">
            {[
              { icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z", active: false },
              { icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z", active: false },
              { icon: "M4 6h16M4 12h16M4 18h7", active: false },
              { icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z", active: false, badge: 0 },
            ].map((item, i) => (
              <button
                key={i}
                className={`w-8 h-8 flex items-center justify-center rounded relative ${
                  item.active ? "bg-black/10" : "hover:bg-black/5"
                }`}
              >
                <svg className="w-4 h-4 text-[#666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                </svg>
              </button>
            ))}
          </div>
          <div className="flex flex-col items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-black/5">
              <svg className="w-4 h-4 text-[#666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-black/5">
              <svg className="w-4 h-4 text-[#666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </aside>

        {/* Editor Panel */}
        <div
          className="flex flex-col shrink-0"
          style={{ width: `${editorWidth}%` }}
        >
          {/* Editor Toolbar */}
          <div
            className="h-9 flex items-center gap-1 px-2 border-b shrink-0"
            style={{ background: "#fafafa", borderColor: "rgba(0,0,0,0.08)" }}
          >
            {[
              { label: "B", style: "font-bold" },
              { label: "I", style: "italic" },
              { label: "U", style: "underline" },
              { label: "H", style: "" },
              { label: "≡", style: "" },
              { label: "</>", style: "font-mono text-[10px]" },
            ].map((btn, i) => (
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
            <span className={`text-[11px] px-1.5 py-0.5 rounded font-medium ${quizData.error ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-700"}`}>
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
                <div
                  key={num}
                  className="text-[13px] leading-[1.7] text-[#999] font-mono"
                >
                  {num}
                </div>
              ))}
            </div>

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onScroll={handleScroll}
              className="flex-1 py-3 px-4 font-mono text-[13px] leading-[1.7] resize-none focus:outline-none"
              style={{ color: "#1c1c1e" }}
              spellCheck={false}
            />
          </div>
        </div>

        {/* Draggable Divider */}
        <div
          onMouseDown={handleMouseDown}
          className="w-1 shrink-0 cursor-col-resize group relative"
          style={{ background: "rgba(0,0,0,0.08)" }}
        >
          <div
            className={`absolute inset-y-0 -left-1 -right-1 group-hover:bg-blue-500/20 transition-colors ${
              isDragging ? "bg-blue-500/30" : ""
            }`}
          />
        </div>

        {/* Preview Panel */}
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
      </div>
    </div>
  );
}
