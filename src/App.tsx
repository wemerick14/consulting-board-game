import { useState, useEffect } from "react";
import { useGame } from "./logic/GameContext";
import { SetupScreen } from "./ui/SetupScreen";
import { Board } from "./ui/Board";
import { Scorebar } from "./ui/Scorebar";
import { Timer } from "./ui/Timer";
import { TileCard } from "./ui/TileCard";
import { PassScreen } from "./ui/PassScreen";
import { SummaryModal } from "./ui/SummaryModal";
import { ChoiceScreen } from "./components/ChoiceScreen";
import { ResultsScreen } from "./components/ResultsScreen";
import { EventModal } from "./components/EventModal";
import { ForkChoiceModal } from "./components/ForkChoiceModal";
import { gradeNumeric, gradeMcq, isSevereMiss } from "./logic/grading";
import { caseDatabase } from "./cases/caseDatabase";
import { generateHint } from "./logic/case-gen";
import { getEventById } from "./logic/events";
import type { Difficulty, EventOutcome } from "./types";

function App() {
  const { state, dispatch } = useGame();
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showPassScreen, setShowPassScreen] = useState(false);
  const [lastGradingResult, setLastGradingResult] = useState<{
    points: number;
    severeMiss: boolean;
  } | null>(null);
  const [showHintModal, setShowHintModal] = useState(false);
  const [currentHint, setCurrentHint] = useState("");

  // Timer logic
  useEffect(() => {
    if (state.phase === "prompt" && state.activePrompt) {
      setTimeRemaining(state.activePrompt.timeLimit);

      const interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [state.phase, state.activePrompt]);

  // Handle game setup
  if (state.phase === "setup") {
    return (
      <SetupScreen
        onStart={(players, settings) => {
          dispatch({ type: "START_GAME", players, settings });
        }}
      />
    );
  }

  // Handle game end
  if (state.phase === "end") {
    const sessionDuration = Math.floor((Date.now() - state.sessionStartTime) / 1000);
    return (
      <div className="min-h-screen bg-gray-50">
        <SummaryModal
          players={state.players}
          promptsCompleted={state.promptsCompleted}
          sessionDuration={sessionDuration}
          onRematch={() => dispatch({ type: "RESET_GAME" })}
        />
      </div>
    );
  }

  const currentPlayer = state.players[state.turnIndex];

  // Handle idle phase - show pass screen and start turn
  if (state.phase === "idle") {
    if (!showPassScreen) {
      setShowPassScreen(true);
    }

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <Scorebar
          players={state.players}
          currentTurnIndex={state.turnIndex}
          onResetGame={() => dispatch({ type: "RESET_GAME" })}
        />
        <Board board={state.board} players={state.players} />

        {showPassScreen && (
          <PassScreen
            playerName={currentPlayer.name}
            onContinue={() => {
              setShowPassScreen(false);
              dispatch({ type: "START_TURN" });
            }}
          />
        )}
      </div>
    );
  }

  // Handle choice phase - player chooses difficulty
  if (state.phase === "choice") {
    return (
      <ChoiceScreen
        playerName={currentPlayer.name}
        onChooseDifficulty={(difficulty: Difficulty) => {
          dispatch({ type: "CHOOSE_DIFFICULTY", difficulty });
        }}
      />
    );
  }

  // Handle prompt phase
  if (state.phase === "prompt" && state.activePrompt) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <Scorebar
          players={state.players}
          currentTurnIndex={state.turnIndex}
          onResetGame={() => dispatch({ type: "RESET_GAME" })}
        />

        <div className="mb-6">
          <h3 className="text-center text-xl font-bold text-gray-700">
            {currentPlayer.name}'s Turn
          </h3>
        </div>

        <Timer timeRemaining={timeRemaining} totalTime={state.activePrompt.timeLimit} />

        {/* Hint Modal */}
        {showHintModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                💡 Hint
              </h3>
              <p className="text-lg text-gray-700 mb-6 text-center font-medium">
                {currentHint}
              </p>
              <button
                onClick={() => setShowHintModal(false)}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Got it!
              </button>
              <p className="text-xs text-gray-500 text-center mt-3">
                Using hints costs 1 point
              </p>
            </div>
          </div>
        )}

        <TileCard
          prompt={state.activePrompt}
          timeRemaining={timeRemaining}
          onSubmit={(answer) => {
            // Calculate grading
            const prompt = state.activePrompt!;
            let earnedPoints = 0;
            let severeMiss = false;

            if (prompt.decision.type === "numeric" && 'final' in prompt.truth) {
              const template = caseDatabase.find(t => t.id === prompt.templateId);
              earnedPoints = gradeNumeric(
                answer as number,
                prompt.truth.final,
                template?.scoring?.tolerance_bands
              );
              severeMiss = isSevereMiss(
                answer as number,
                prompt.truth.final,
                template?.severe_miss_rule
              );
            } else if (prompt.decision.type === "mcq" && 'correctIndex' in prompt.truth) {
              earnedPoints = gradeMcq(answer as number, prompt.decision.points || [4, 3, 2, 0]);
            }

            setLastGradingResult({ points: earnedPoints, severeMiss });
            dispatch({ type: "SUBMIT_ANSWER", answer });
          }}
          onUseAdd60={() => {
            dispatch({ type: "USE_ADD60" });
            setTimeRemaining(prev => prev + 60);
          }}
          onUseGooglePeek={() => {
            dispatch({ type: "USE_GOOGLE_PEEK" });
            alert("Google Peek: This feature shows you the general approach to solve this case. (Not implemented in MVP)");
          }}
          onUseHint={() => {
            const template = caseDatabase.find(t => t.id === state.activePrompt?.templateId);
            if (template) {
              const hint = generateHint(template);
              setCurrentHint(hint);
              setShowHintModal(true);
              dispatch({ type: "USE_HINT" });
            }
          }}
          creditsAvailable={currentPlayer.credits}
        />
      </div>
    );
  }

  // Handle grading phase - show results briefly then apply grading
  if (state.phase === "grading" && lastGradingResult) {
    setTimeout(() => {
      dispatch({
        type: "APPLY_GRADING",
        earnedPoints: lastGradingResult.points,
        isSevereMiss: lastGradingResult.severeMiss
      });
    }, 2000);

    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-12 max-w-md text-center">
          <div className="text-6xl mb-4">
            {lastGradingResult.points >= 3 ? "🎉" : lastGradingResult.points >= 2 ? "👍" : "😅"}
          </div>
          <h2 className="text-3xl font-bold mb-2">
            {lastGradingResult.points >= 3 ? "Great Job!" : lastGradingResult.points >= 2 ? "Good Try!" : "Keep Going!"}
          </h2>
          <div className="text-5xl font-bold text-blue-600 mb-4">
            +{lastGradingResult.points} points
          </div>
          {lastGradingResult.severeMiss && (
            <div className="text-red-600 font-semibold">
              Severe miss! Move back 1 space
            </div>
          )}
          {state.activePrompt && 'final' in state.activePrompt.truth && (
            <div className="mt-4 text-gray-600">
              Correct answer: {state.activePrompt.truth.final.toLocaleString()}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Handle results phase - show leaderboard
  if (state.phase === "results" && state.lastGradingResult) {
    return (
      <ResultsScreen
        players={state.players}
        currentPlayerName={currentPlayer.name}
        earnedPoints={state.lastGradingResult.points}
        isSevereMiss={state.lastGradingResult.severeMiss}
        onContinue={() => {
          dispatch({ type: "SHOW_RESULTS" });
        }}
      />
    );
  }

  // Handle transition phase - move to next turn
  if (state.phase === "transition") {
    setTimeout(() => {
      dispatch({ type: "END_TURN" });
      setShowPassScreen(false);
      setLastGradingResult(null);
    }, 1500);

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <Scorebar
          players={state.players}
          currentTurnIndex={state.turnIndex}
          onResetGame={() => dispatch({ type: "RESET_GAME" })}
        />
        <Board board={state.board} players={state.players} />

        <div className="text-center mt-8">
          <div className="text-2xl font-bold text-gray-700">
            Position updated! Next turn...
          </div>
        </div>
      </div>
    );
  }

  // Handle event phase - show event modal
  if (state.phase === "event" && state.activeEvent) {
    const handleEventChoice = (choiceIndex: number) => {
      const event = getEventById(state.activeEvent!.id);
      if (!event || !event.choices) return;

      const choice = event.choices[choiceIndex];
      let outcome: EventOutcome = {};

      // Handle probability-based outcomes
      if (choice.effect.probability !== undefined) {
        const success = Math.random() < choice.effect.probability;
        outcome = success ? choice.effect.successEffect : choice.effect.failEffect;
      } else {
        // Direct outcome
        outcome = {
          pointsChange: choice.effect.pointsChange,
          positionChange: choice.effect.positionChange,
          creditsChange: choice.effect.creditsChange
        };
      }

      dispatch({ type: "RESOLVE_EVENT", outcome });
    };

    const handleEventContinue = () => {
      // If event has an outcome (resolved), go to transition phase
      if (state.activeEvent?.outcome) {
        dispatch({ type: "SHOW_RESULTS" });
      } else {
        // Simple event with direct effect - resolve it first
        const event = getEventById(state.activeEvent?.id || "");
        if (event?.effect) {
          dispatch({ type: "RESOLVE_EVENT", outcome: event.effect });
        } else {
          // No effect, just continue
          dispatch({ type: "SHOW_RESULTS" });
        }
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <Scorebar
          players={state.players}
          currentTurnIndex={state.turnIndex}
          onResetGame={() => dispatch({ type: "RESET_GAME" })}
        />
        <Board board={state.board} players={state.players} />

        <EventModal
          eventId={state.activeEvent.id}
          outcome={state.activeEvent.outcome}
          onChooseOption={handleEventChoice}
          onContinue={handleEventContinue}
        />
      </div>
    );
  }

  // Handle fork phase - choose risk or safe path
  if (state.phase === "fork" && state.forkDecision) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <Scorebar
          players={state.players}
          currentTurnIndex={state.turnIndex}
          onResetGame={() => dispatch({ type: "RESET_GAME" })}
        />
        <Board board={state.board} players={state.players} />

        <ForkChoiceModal
          fromTile={state.forkDecision.fromTile}
          options={state.forkDecision.options}
          onChoosePath={(targetTile) => dispatch({ type: "CHOOSE_FORK_PATH", targetTile })}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Scorebar
        players={state.players}
        currentTurnIndex={state.turnIndex}
        onResetGame={() => dispatch({ type: "RESET_GAME" })}
      />
      <Board board={state.board} players={state.players} />
    </div>
  );
}

export default App;
