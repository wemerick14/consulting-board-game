import React, { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import { GameState, GameAction, Player } from "../types";
import { createBoard, getRankFromPosition } from "./board";
import { generateCase } from "./case-gen";
import { caseDatabase } from "../cases/caseDatabase";
import { gradeNumeric, gradeMcq, isSevereMiss } from "./grading";

const initialState: GameState = {
  players: [],
  turnIndex: 0,
  board: createBoard(),
  phase: "setup",
  settings: {
    timerSecs: 75,
    session: "standard"
  },
  sessionStartTime: Date.now(),
  promptsCompleted: 0
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "START_GAME":
      return {
        ...state,
        players: action.players,
        settings: action.settings,
        phase: "idle",
        turnIndex: 0,
        sessionStartTime: Date.now(),
        promptsCompleted: 0
      };

    case "START_TURN": {
      // Generate a new case
      const seed = Date.now() + state.turnIndex + state.promptsCompleted;
      const randomTemplate = caseDatabase[Math.floor(Math.random() * caseDatabase.length)];
      const prompt = generateCase(randomTemplate, seed);

      return {
        ...state,
        phase: "prompt",
        activePrompt: prompt
      };
    }

    case "SUBMIT_ANSWER": {
      if (!state.activePrompt) return state;

      const currentPlayer = state.players[state.turnIndex];
      const prompt = state.activePrompt;

      let earnedPoints = 0;
      let severeMiss = false;

      if (prompt.decision.type === "numeric" && 'final' in prompt.truth) {
        const template = caseDatabase.find(t => t.id === prompt.templateId);
        earnedPoints = gradeNumeric(
          action.answer as number,
          prompt.truth.final,
          template?.scoring?.tolerance_bands
        );
        severeMiss = isSevereMiss(
          action.answer as number,
          prompt.truth.final,
          template?.severe_miss_rule
        );
      } else if (prompt.decision.type === "mcq" && 'correctIndex' in prompt.truth) {
        earnedPoints = gradeMcq(action.answer as number, prompt.decision.points || [4, 3, 2, 0]);
      }

      return {
        ...state,
        phase: "grading",
        players: state.players.map((p, idx) =>
          idx === state.turnIndex
            ? { ...p, points: p.points + earnedPoints }
            : p
        )
      };
    }

    case "APPLY_GRADING": {
      const currentPlayer = state.players[state.turnIndex];
      const isGoodAnswer = action.earnedPoints >= 2;

      // Update streak
      const newStreak = isGoodAnswer ? currentPlayer.streak + 1 : 0;
      const streakBonus = newStreak >= 3 && newStreak % 3 === 0 ? 1 : 0;

      // Calculate spaces to move
      let spacesToMove = 1; // Base movement
      if (streakBonus > 0) spacesToMove += 1;
      if (action.isSevereMiss) spacesToMove = -1; // Move backward

      return {
        ...state,
        players: state.players.map((p, idx) =>
          idx === state.turnIndex
            ? {
                ...p,
                streak: newStreak,
                position: Math.max(0, Math.min(p.position + spacesToMove, state.board.length - 1)),
                rank: getRankFromPosition(Math.max(0, Math.min(p.position + spacesToMove, state.board.length - 1)))
              }
            : p
        ),
        phase: "transition"
      };
    }

    case "ADVANCE_TOKEN": {
      const currentPlayer = state.players[state.turnIndex];
      const newPosition = Math.max(0, Math.min(currentPlayer.position + action.spaces, state.board.length - 1));

      return {
        ...state,
        players: state.players.map((p, idx) =>
          idx === state.turnIndex
            ? {
                ...p,
                position: newPosition,
                rank: getRankFromPosition(newPosition)
              }
            : p
        )
      };
    }

    case "END_TURN": {
      const nextTurnIndex = (state.turnIndex + 1) % state.players.length;
      const promptsCompleted = state.promptsCompleted + 1;

      // Check if any player has reached retirement (position 18)
      const hasWinner = state.players.some(p => p.position >= 18);

      return {
        ...state,
        turnIndex: nextTurnIndex,
        promptsCompleted,
        phase: hasWinner ? "end" : "idle",
        activePrompt: undefined
      };
    }

    case "USE_ADD60": {
      return {
        ...state,
        players: state.players.map((p, idx) =>
          idx === state.turnIndex && p.credits.add60 > 0
            ? {
                ...p,
                credits: { ...p.credits, add60: p.credits.add60 - 1 },
                points: p.points - 1 // Penalty for using credit
              }
            : p
        )
      };
    }

    case "USE_GOOGLE_PEEK": {
      return {
        ...state,
        players: state.players.map((p, idx) =>
          idx === state.turnIndex && p.credits.googlePeek > 0
            ? {
                ...p,
                credits: { ...p.credits, googlePeek: p.credits.googlePeek - 1 },
                points: p.points - 1
              }
            : p
        )
      };
    }

    case "USE_HINT": {
      return {
        ...state,
        players: state.players.map((p, idx) =>
          idx === state.turnIndex && p.credits.fiveWordHint > 0
            ? {
                ...p,
                credits: { ...p.credits, fiveWordHint: p.credits.fiveWordHint - 1 },
                points: p.points - 1
              }
            : p
        )
      };
    }

    case "END_GAME":
      return {
        ...state,
        phase: "end"
      };

    case "RESET_GAME":
      return initialState;

    default:
      return state;
  }
}

interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const GameContext = createContext<GameContextValue | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState, (initial) => {
    // Try to load from localStorage
    const saved = localStorage.getItem("consulting-game-state");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initial;
      }
    }
    return initial;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("consulting-game-state", JSON.stringify(state));
  }, [state]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within GameProvider");
  }
  return context;
}
