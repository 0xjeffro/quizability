"use client";

interface TopMenuBarProps {
  title?: string;
  fileName?: string;
}

export function TopMenuBar({ title = "Quizability", fileName = "untitled.yaml" }: TopMenuBarProps) {
  return (
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
          <span className="font-semibold text-[14px] text-[#1c1c1e]">{title}</span>
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
        <span className="text-[#1c1c1e]">{fileName}</span>
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
  );
}
