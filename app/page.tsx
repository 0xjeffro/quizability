"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { type PaperTheme } from "@/components/paper";
import {
  TopMenuBar,
  IconSidebar,
  EditorPanel,
  DraggableDivider,
  PreviewPanel,
} from "@/components/editor";
import { defaultQuizContent } from "@/lib/defaultQuiz";
import { parseQuizContent } from "@/lib/quizParser";

export default function Home() {
  const [theme, setTheme] = useState<PaperTheme>("paper");
  const [content, setContent] = useState(defaultQuizContent);
  const [zoom, setZoom] = useState(75);
  const [editorWidth, setEditorWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle divider drag
  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const sidebarWidth = 40;
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

  // Parse YAML content
  const quizData = useMemo(() => parseQuizContent(content), [content]);

  return (
    <div className="h-screen flex flex-col bg-[#f5f5f5]">
      <TopMenuBar fileName="react-fundamentals.yaml" />

      <div ref={containerRef} className="flex-1 flex overflow-hidden">
        <IconSidebar />

        <EditorPanel
          content={content}
          onChange={setContent}
          hasError={!!quizData.error}
          width={`${editorWidth}%`}
        />

        <DraggableDivider
          isDragging={isDragging}
          onMouseDown={handleMouseDown}
        />

        <PreviewPanel
          theme={theme}
          setTheme={setTheme}
          zoom={zoom}
          setZoom={setZoom}
          quizData={quizData}
        />
      </div>
    </div>
  );
}
