// Player and Credits
export type Credits = {
  add60: number;
  googlePeek: number;
  fiveWordHint: number;
};

export type Player = {
  id: string;
  name: string;
  points: number;
  position: number; // board index
  streak: number;
  credits: Credits;
  rank: string; // "Analyst", "Sr Analyst", "Associate", etc.
};

// Board
export type TileKind = "normal" | "riskFork" | "riskMerge" | "event" | "promotion";

export type Tile = {
  id: string;
  kind: TileKind;
  next: number[]; // indices to support forks
  eventId?: string; // for event tiles
  label?: string;
};

// Case Templates
export type CaseCategory =
  | "market_sizing"
  | "profitability"
  | "market_entry"
  | "pricing"
  | "pricing_strategy"
  | "competitive_response"
  | "growth_strategy"
  | "customer_retention"
  | "product_launch"
  | "cost_reduction"
  | "expansion"
  | "partnership"
  | "ops"
  | "pe"
  | "public"
  | "quick_math";

export type Difficulty = "quick" | "full";

export type ParamDef = {
  min?: number;
  max?: number;
  step?: number;
  choices?: any[];
};

export type DecisionType =
  | { type: "numeric" }
  | { type: "mcq"; options: string[]; points: number[] };

export type CaseTemplate = {
  id: string;
  category: CaseCategory;
  difficulty: Difficulty;
  title: string;
  stem_template: string; // "A {segment} retailer..."
  inputs: string[]; // names of parameters players will see
  params: Record<string, ParamDef>;
  decision: DecisionType;
  truth_howto: string; // how to compute the correct result
  severe_miss_rule?: "opposite_sign" | "overshoot_x2" | "none";
  time_limit_s: number; // 60–90
  scoring?: { tolerance_bands?: number[] }; // numeric grading bands
  max_points?: number; // Max points for this question
};

// Prompt Instance
export type TruthResult =
  | { final: number; steps?: Record<string, number> }
  | { correctIndex: number };

export type PromptInstance = {
  templateId: string;
  filledStem: string;
  numbers: Record<string, number | string>;
  decision: DecisionType;
  truth: TruthResult;
  timeLimit: number;
};

// Events
export type EventOutcome = {
  pointsChange?: number;
  creditsChange?: { add60?: number; googlePeek?: number; fiveWordHint?: number };
  positionChange?: number;
  toleranceBoost?: boolean;
  difficultyOverride?: "quick" | "full";
};

// Game State
export type GamePhase = "setup" | "idle" | "choice" | "prompt" | "grading" | "results" | "transition" | "end" | "event" | "fork";

export type GameSettings = {
  timerSecs: 60 | 75 | 90;
  session: "short" | "standard";
};

export type GameState = {
  players: Player[];
  turnIndex: number; // current player idx
  board: Tile[];
  phase: GamePhase;
  activePrompt?: PromptInstance;
  chosenDifficulty?: Difficulty;
  lastGradingResult?: { points: number; severeMiss: boolean };
  activeEvent?: { id: string; outcome?: EventOutcome };
  forkDecision?: { fromTile: number; options: number[] };
  recentEvents?: string[]; // Track recent event IDs to avoid repetition
  settings: GameSettings;
  sessionStartTime: number;
  promptsCompleted: number;
};

// Actions
export type GameAction =
  | { type: "START_GAME"; players: Player[]; settings: GameSettings }
  | { type: "START_TURN" }
  | { type: "CHOOSE_DIFFICULTY"; difficulty: Difficulty }
  | { type: "SUBMIT_ANSWER"; answer: number | number }
  | { type: "APPLY_GRADING"; earnedPoints: number; isSevereMiss: boolean }
  | { type: "SHOW_RESULTS" }
  | { type: "ADVANCE_TOKEN"; spaces: number }
  | { type: "END_TURN" }
  | { type: "USE_ADD60" }
  | { type: "USE_GOOGLE_PEEK" }
  | { type: "USE_HINT" }
  | { type: "TRIGGER_EVENT"; eventId: string }
  | { type: "RESOLVE_EVENT"; outcome: EventOutcome }
  | { type: "CHOOSE_EVENT_OPTION"; choiceIndex: number }
  | { type: "CHOOSE_FORK_PATH"; targetTile: number }
  | { type: "END_GAME" }
  | { type: "RESET_GAME" };
