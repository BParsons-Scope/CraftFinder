// app/lib/quiz/types.ts
export type QuestionType = "single" | "multi";

export type OptionDef = {
  id: string;     // stable optionId
  label: string;  // editable copy
};

export type QuestionDef = {
  id: string;         // stable questionId
  prompt: string;     // editable copy
  type: QuestionType;
  options: OptionDef[];
  skippable: true;
};

export type ResponseMap = Record<string, string[]>; // questionId -> optionIds (empty = skipped)
