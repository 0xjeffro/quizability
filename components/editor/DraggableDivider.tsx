"use client";

interface DraggableDividerProps {
  isDragging: boolean;
  onMouseDown: () => void;
}

export function DraggableDivider({ isDragging, onMouseDown }: DraggableDividerProps) {
  return (
    <div
      onMouseDown={onMouseDown}
      className="w-1 shrink-0 cursor-col-resize group relative"
      style={{ background: "rgba(0,0,0,0.08)" }}
    >
      <div
        className={`absolute inset-y-0 -left-1 -right-1 group-hover:bg-blue-500/20 transition-colors ${
          isDragging ? "bg-blue-500/30" : ""
        }`}
      />
    </div>
  );
}
