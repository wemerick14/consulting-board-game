import React, { createContext, useContext, useReducer, useEffect } from "react";
import type { ReactNode } from "react";
import type { GameState, GameAction } from "../types";
import { createBoard, getRankFromPosition } from "./board";
import { generateCase } from "./case-gen";
import { caseDatabase } from "../cases/caseDatabase";
import { gradeNumeric, gradeMcq } from "./grading";

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
      // Move to choice phase instead of directly to prompt
      return {
        ...state,
        phase: "choice",
        chosenDifficulty: undefined,
        lastGradingResult: undefined
      };
    }

    case "CHOOSE_DIFFICULTY": {
      // Generate a case based on chosen difficulty
      const seed = Date.now() + state.turnIndex + state.promptsCompleted;
      const templatesWithDifficulty = caseDatabase.filter(t => t.difficulty === action.difficulty);
      const randomTemplate = templatesWithDifficulty[Math.floor(Math.random() * templatesWithDifficulty.length)];
      const prompt = generateCase(randomTemplate, seed);

      return {
        ...state,
        phase: "prompt",
        chosenDifficulty: action.difficulty,
        activePrompt: prompt
      };
    }

    case "SUBMIT_ANSWER": {
      if (!state.activePrompt) return state;

      const prompt = state.activePrompt;
      let earnedPoints = 0;

      if (prompt.decision.type === "numeric" && 'final' in prompt.truth) {
        const template = caseDatabase.find(t => t.id === prompt.templateId);
        earnedPoints = gradeNumeric(
          action.answer as number,
          prompt.truth.final,
          template?.scoring?.tolerance_bands
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
        lastGradingResult: {
          points: action.earnedPoints,
          severeMiss: action.isSevereMiss
        },
        phase: "results"
      };
    }

    case "SHOW_RESULTS": {
      // Check if player landed on special tile
      const currentPlayer = state.players[state.turnIndex];
      const currentTile = state.board[currentPlayer.position];

      // Check for event tile
      if (currentTile.kind === "event" && currentTile.eventId) {
        return {
          ...state,
          phase: "event",
          activeEvent: { id: currentTile.eventId }
        };
      }

      // Check for fork tile
      if (currentTile.kind === "riskFork" && currentTile.next && currentTile.next.length > 1) {
        return {
          ...state,
          phase: "fork",
          forkDecision: {
            fromTile: currentPlayer.position,
            options: currentTile.next
          }
        };
      }

      // No special tile, proceed to transition
      return {
        ...state,
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

    case "TRIGGER_EVENT": {
      // Trigger an event when player lands on event tile
      return {
        ...state,
        phase: "event",
        activeEvent: { id: action.eventId }
      };
    }

    case "RESOLVE_EVENT": {
      // Apply event outcome to current player
      const outcome = action.outcome;

      let updatedPlayers = state.players.map((p, idx) => {
        if (idx !== state.turnIndex) return p;

        let updates: any = {};

        // Apply points change
        if (outcome.pointsChange) {
          updates.points = p.points + outcome.pointsChange;
        }

        // Apply position change
        if (outcome.positionChange) {
          const newPos = Math.max(0, Math.min(p.position + outcome.positionChange, state.board.length - 1));
          updates.position = newPos;
          updates.rank = getRankFromPosition(newPos);
        }

        // Apply credits change
        if (outcome.creditsChange) {
          updates.credits = { ...p.credits };
          if (outcome.creditsChange.add60) {
            updates.credits.add60 = Math.max(0, p.credits.add60 + outcome.creditsChange.add60);
          }
          if (outcome.creditsChange.fiveWordHint) {
            updates.credits.fiveWordHint = Math.max(0, p.credits.fiveWordHint + outcome.creditsChange.fiveWordHint);
          }
          if (outcome.creditsChange.googlePeek) {
            updates.credits.googlePeek = Math.max(0, p.credits.googlePeek + outcome.creditsChange.googlePeek);
          }
        }

        return { ...p, ...updates };
      });

      // Track this event to avoid immediate repetition
      const recentEvents = [...(state.recentEvents || []), state.activeEvent!.id].slice(-5);

      return {
        ...state,
        players: updatedPlayers,
        activeEvent: { ...state.activeEvent!, outcome },
        recentEvents,
        phase: "event" // Stay in event phase to show outcome
      };
    }

    case "CHOOSE_EVENT_OPTION": {
      // Player chose an option in a choice event
      // This will be handled by resolving to an outcome
      return state; // The component will call RESOLVE_EVENT after processing choice
    }

    case "CHOOSE_FORK_PATH": {
      // Player chooses which path to take at a fork
      return {
        ...state,
        players: state.players.map((p, idx) =>
          idx === state.turnIndex
            ? {
                ...p,
                position: action.targetTile,
                rank: getRankFromPosition(action.targetTile)
              }
            : p
        ),
        phase: "choice", // Go back to difficulty choice
        forkDecision: undefined
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
