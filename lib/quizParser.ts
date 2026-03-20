import yaml from "js-yaml";

export function updateSelectedAnswer(
  content: string,
  sectionIndex: number,
  questionIndex: number,
  selectedAnswer: string
): string {
  try {
    const parsed = yaml.load(content) as RawQuizData;
    if (parsed?.sections?.[sectionIndex]?.questions?.[questionIndex]) {
      parsed.sections[sectionIndex].questions[questionIndex].selected_answer = selectedAnswer.toUpperCase();
      return yaml.dump(parsed, {
        indent: 2,
        lineWidth: -1,
        quotingType: '"',
        forceQuotes: false,
      });
    }
    return content;
  } catch {
    return content;
  }
}

export interface QuizQuestion {
  type: "mcq" | "fill_blank" | "short_answer";
  question: string;
  options?: string[];
  answer: string;
  selected_answer?: string;
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
  options: { label: string; value: string }[];
  answer: string;
  selectedAnswer: string;
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
      options: (q.options || []).map((opt) => {
        const optStr = String(opt);
        const match = optStr.match(/^([A-Z])\.\s*(.+)/);
        return {
          label: optStr,
          value: match ? match[1].toLowerCase() : optStr,
        };
      }),
      answer: String(q.answer || "").toLowerCase(),
      selectedAnswer: q.selected_answer ? String(q.selected_answer).toLowerCase() : "",
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
