import yaml from "js-yaml";

export interface QuizQuestion {
  type: "mcq" | "fill_blank" | "short_answer";
  question: string;
  options?: string[];
  answer: string;
  explanation?: string;
}

export interface QuizSection {
  title: string;
  subtitle?: string;
  questions: QuizQuestion[];
}

export interface RawQuizData {
  title: string;
  description?: string;
  sections: QuizSection[];
}

export interface ParsedQuestion {
  questionNumber: number;
  question: string;
  type: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface ParsedSection {
  title: string;
  subtitle: string;
  questions: ParsedQuestion[];
}

export interface ParsedQuizData {
  title: string;
  description: string;
  sections: ParsedSection[];
  error: string | null;
}

export function parseQuizContent(content: string): ParsedQuizData {
  let questionCounter = 0;

  const parseQuestion = (q: QuizQuestion): ParsedQuestion => {
    questionCounter++;
    return {
      questionNumber: questionCounter,
      question: q.question || "",
      type: q.type || "mcq",
      options: (q.options || []).map((opt) => String(opt)),
      answer: String(q.answer || "").toUpperCase(),
      explanation: q.explanation || "",
    };
  };

  try {
    const parsed = yaml.load(content) as RawQuizData;
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
}
