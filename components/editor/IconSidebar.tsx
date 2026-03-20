"use client";

const topIcons = [
  { icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z", label: "Files" },
  { icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z", label: "Search" },
  { icon: "M4 6h16M4 12h16M4 18h7", label: "Outline" },
  { icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z", label: "Warnings" },
];

const bottomIcons = [
  { icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z", label: "Settings" },
  { icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", label: "Help" },
];

export function IconSidebar() {
  return (
    <aside
      className="w-10 flex flex-col items-center py-2 border-r shrink-0"
      style={{ background: "#fafafa", borderColor: "rgba(0,0,0,0.08)" }}
    >
      <div className="flex-1 flex flex-col items-center gap-1">
        {topIcons.map((item, i) => (
          <button
            key={i}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-black/5"
            title={item.label}
          >
            <svg className="w-4 h-4 text-[#666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
            </svg>
          </button>
        ))}
      </div>
      <div className="flex flex-col items-center gap-1">
        {bottomIcons.map((item, i) => (
          <button
            key={i}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-black/5"
            title={item.label}
          >
            <svg className="w-4 h-4 text-[#666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
            </svg>
          </button>
        ))}
      </div>
    </aside>
  );
}
