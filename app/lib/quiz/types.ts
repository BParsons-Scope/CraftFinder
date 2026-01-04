// app/lib/quiz/types.ts
export type QuestionType = "single" | "multi";

export type OptionDef = {
  id: string;     // stable optionId (never reuse for different meaning)
  label: string;  // editable copy
};

export type QuestionDef = {
  id: string;        // stable questionId
  prompt: string;    // editable copy
  type: QuestionType;
  options: OptionDef[];
  skippable: true;   // in your current design, always true
};

export type ResponseMap = Record<string, string[]>; // questionId -> optionIds (empty = skipped)
