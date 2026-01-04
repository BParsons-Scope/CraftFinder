// app/lib/quiz/questions.ts
import { QuestionDef } from "./types";

export const QUESTIONS: QuestionDef[] = [
  // Context & environment
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
  {
    id: "social",
    prompt: "How social do you like your craft?",
    type: "single",
    skippable: true,
    options: [
      { id: "social_inherently", label: "I love an inherently, fundamentally social craft" },
      { id: "social_chatty", label: "I love crafts I can do while chatting or talking on the phone" },
      { id: "social_me_time", label: "Crafts are my me-time, and I want to keep it that way" },
    ],
  },
  {
    id: "computers",
    prompt: "How do you want computers to add to your craft?",
    type: "single",
    skippable: true,
    options: [
      { id: "computers_analogue_only", label: "Craft is my analogue-only, screen-free time" },
      { id: "computers_helpful", label: "I can use computers to help me, but it’s primarily an IRL pastime" },
      { id: "computers_digital_tools", label: "I love using available digital tools and programs to help me create things" },
      { id: "computers_digital_first", label: "I love primarily digitally created crafts" },
    ],
  },

  // Sensory & household constraints
  {
    id: "mess",
    prompt: "How tolerant are you of mess?",
    type: "single",
    skippable: true,
    options: [
      { id: "mess_joyful", label: "Life is full of wonderful mess, and my craft is no different" },
      { id: "mess_low_cleaning", label: "Cleaning should not be a significant feature of any craft I undertake" },
      { id: "mess_visitors_ready", label: "I expect to put my craft down and have visitors immediately, with no more than a couple of seconds of tidying" },
      { id: "mess_editorial", label: "I want a beautiful, spartan workspace that consistently looks like an editorial photo" },
    ],
  },
  {
    id: "sensory_avoid",
    prompt: "Are there any sensory experiences you really don’t enjoy while crafting?",
    type: "multi",
    skippable: true,
    options: [
      { id: "sensory_no_smell", label: "Nothing smelly" },
      { id: "sensory_no_sticky", label: "Nothing sticky or oily" },
      { id: "sensory_no_dust", label: "Nothing dusty" },
      { id: "sensory_no_noise", label: "Nothing noisy" },
    ],
  },
  {
    id: "tools_danger",
    prompt: "How sharp or dangerous can the tools be?",
    type: "single",
    skippable: true,
    options: [
      { id: "tools_toddler_safe", label: "A toddler could play with the tools unsupervised, safely" },
      { id: "tools_hazard_ok", label: "I respect the tools and materials and can be trusted with hazardous things" },
      { id: "tools_low_stress", label: "I’m an adult, but don’t want to make life stressful either" },
    ],
  },

  // Time, rhythm & repetition
  {
    id: "work_style",
    prompt: "How do you prefer to work on crafts?",
    type: "single",
    skippable: true,
    options: [
      { id: "work_uninterrupted", label: "Hours of uninterrupted work" },
      { id: "work_one_session", label: "Start and finish in one session" },
      { id: "work_tiny_chunks", label: "In tiny chunks" },
    ],
  },
  {
    id: "duration",
    prompt: "How long do you want your next craft to last?",
    type: "single",
    skippable: true,
    options: [
      { id: "duration_afternoon", label: "A fun afternoon sounds wonderful" },
      { id: "duration_days_weeks", label: "A couple of days or weeks to complete would be satisfying" },
      { id: "duration_months", label: "Months of work gives me a rush of accomplishment" },
    ],
  },
  {
    id: "repeatability",
    prompt: "Do you want to repeat a method or craft across multiple projects?",
    type: "single",
    skippable: true,
    options: [
      { id: "repeat_new_often", label: "I love trying a new thing as often as possible" },
      { id: "repeat_a_few_times", label: "I like to repeat a few times until I’m interested in something new" },
      { id: "repeat_master_one", label: "I like the comfort and mastery of one craft repeated" },
    ],
  },

  // Energy, planning & process
  {
    id: "mental_energy",
    prompt: "How much mental energy do you like to put in?",
    type: "single",
    skippable: true,
    options: [
      { id: "energy_meditative", label: "Hardly have to think twice — just repeat steps until finished; nearly meditative" },
      { id: "energy_tips_flow", label: "Follow some basic tips and instructions, but go with the flow" },
      { id: "energy_clear_steps", label: "Follow clear steps, and feel the stages of a project be completed" },
      { id: "energy_plan_myself", label: "I enjoy planning it out and working out how I get to the result myself" },
      { id: "energy_physical_puzzle", label: "I love a challenging problem to solve physically" },
    ],
  },
  {
    id: "shopping",
    prompt: "Do you enjoy shopping for materials?",
    type: "single",
    skippable: true,
    options: [
      { id: "shop_fun", label: "It’s part of the fun" },
      { id: "shop_upgrade", label: "I like rewarding myself with an upgraded tool or material" },
      { id: "shop_use_what_i_have", label: "I like to mostly use what I have" },
      { id: "shop_hate_choosing", label: "Choosing what to get is the worst part of the process" },
    ],
  },

  // Skill, control & imperfection
  {
    id: "hand_confidence",
    prompt: "How confident are you with your hands?",
    type: "single",
    skippable: true,
    options: [
      { id: "hands_good", label: "I’ve got good hand–eye coordination" },
      { id: "hands_fine", label: "I’m fine, not brilliant" },
      { id: "hands_shaky", label: "I’m a bit loose or shaky" },
      { id: "hands_low", label: "I’ve got low coordination" },
    ],
  },
  {
    id: "perfection",
    prompt: "How perfect do you want the result to be?",
    type: "single",
    skippable: true,
    options: [
      { id: "perfect_accidents_ok", label: "Randomness and accidents are part of the process" },
      { id: "perfect_fix_some", label: "I want it to look handmade, but will fix some mistakes" },
      { id: "perfect_flawless", label: "I want it to look flawless" },
    ],
  },

  // Aesthetics, outputs & values
  {
    id: "style",
    prompt: "What kind of style do you want the outcome to be?",
    type: "single",
    skippable: true,
    options: [
      { id: "style_modern", label: "Cool and modern" },
      { id: "style_cosy", label: "Cosy and homely" },
      { id: "style_classic", label: "Classic and traditional" },
      { id: "style_kawaii", label: "Adorable and kawaii" },
      { id: "style_natural", label: "Natural and chic" },
      { id: "style_quirky", label: "Quirky and unique" },
      { id: "style_minimal", label: "Minimal and restrained" },
      { id: "style_maximal", label: "Bold and maximalist" },
    ],
  },
  {
    id: "produce",
    prompt: "What would you prefer to produce?",
    type: "single",
    skippable: true,
    options: [
      { id: "produce_beautiful_functional", label: "Something beautiful and functional" },
      { id: "produce_beautiful", label: "Something beautiful" },
      { id: "produce_functional", label: "Something functional" },
    ],
  },
  {
    id: "outputs",
    prompt: "What do you do with the outputs?",
    type: "single",
    skippable: true,
    options: [
      { id: "output_gifts", label: "Presents for people" },
      { id: "output_decor", label: "Home décor" },
      { id: "output_functional_life", label: "Functional additions to daily life" },
      { id: "output_store_look", label: "Put them away and look at them occasionally" },
      { id: "output_ephemeral", label: "I enjoy ephemeral and temporary outputs" },
      { id: "output_dont_care", label: "I don’t care what happens to it afterwards" },
    ],
  },
  {
    id: "waste",
    prompt: "How much do you want to minimise waste?",
    type: "single",
    skippable: true,
    options: [
      { id: "waste_not_worried", label: "I produce very little waste generally, so I’m not worried" },
      { id: "waste_mindful", label: "I try to be mindful, but it’s not a constraint" },
      { id: "waste_use_waste", label: "I would prefer to use things that are already waste" },
    ],
  },
];

// This is the only thing you reorder to change the quiz flow.
export const QUIZ_FLOW: string[] = [
  "where_craft",
  "space",
  "social",
  "computers",
  "mess",
  "sensory_avoid",
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

// Dev sanity check: flow IDs must exist in QUESTIONS.
const ids = new Set(QUESTIONS.map((q) => q.id));
for (const id of QUIZ_FLOW) {
  if (!ids.has(id)) {
    // eslint-disable-next-line no-console
    console.warn(`[CraftFinder] QUIZ_FLOW references missing question id: "${id}"`);
  }
}
