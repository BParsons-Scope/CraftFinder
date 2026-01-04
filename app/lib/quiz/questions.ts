// app/lib/quiz/questions.ts
import { QuestionDef } from "./types";

export const QUESTIONS: QuestionDef[] = [
  {
    id: "where_craft",
    prompt: "Where are you more likely to craft?",
    type: "single",
    skippable: true,
    options: [
      { id: "where_tv", label: "In front of the TV" },
      { id: "where_space", label: "In a dedicated craft space" },
      { id: "where_table", label: "At a kitchen/dining table" },
      { id: "where_plane", label: "On a plane" },
    ],
  },
  {
    id: "space",
    prompt: "How much space",
    type: "single",
    skippable: true,
    options: [
      { id: "space_1", label: "In front of the TV" },
      { id: "space_2", label: "In a dedicated craft space" },
      { id: "space_3", label: "At a kitchen/dining table" },
      { id: "space_4", label: "On a plane" },
    ],
  }
  // ...repeat for the rest
];

// This is the only thing you reorder to change the quiz flow.
export const QUIZ_FLOW: string[] = [
  "where_craft",
  "space",
  "social",
  "computers",
  "mess",
  "sensory",
  "tools_danger",
  "work_style",
  "duration",
  "repeatability",
  "mental_energy",
  "shopping",
  "hand_confidence",
  "perfection",
  "style",
  "produce",
  "outputs",
  "waste",
];
