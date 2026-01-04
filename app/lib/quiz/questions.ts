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
  prompt: "How much space do you work in?",
  type: "single",
  skippable: true,
  options: [
    { id: "space_lap", label: "On my lap" },
    { id: "space_small_desk", label: "At a small desk" },
    { id: "space_large", label: "A large workspace" },
    { id: "space_floor", label: "Sprawled out across the floor" },
  ],
},
  // ...repeat for the rest
];

// This is the only thing you reorder to change the quiz flow.
export const QUIZ_FLOW: string[] = [
  "where_craft",
  "space",
  // "social",
  // "computers",
  // "mess",
  // "sensory",
  // "tools_danger",
  // "work_style",
  // "duration",
  // "repeatability",
  // "mental_energy",
  // "shopping",
  // "hand_confidence",
  // "perfection",
  // "style",
  // "produce",
  // "outputs",
  // "waste",
];
