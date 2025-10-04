import { useState, useEffect } from "react";
import { useGame } from "./logic/GameContext";
import { SetupScreen } from "./ui/SetupScreen";
import { Board } from "./ui/Board";
import { Scorebar } from "./ui/Scorebar";
import { Timer } from "./ui/Timer";
import { TileCard } from "./ui/TileCard";
import { PassScreen } from "./ui/PassScreen";
import { SummaryModal } from "./ui/SummaryModal";
import { gradeNumeric, gradeMcq, isSevereMiss } from "./logic/grading";
import { caseDatabase } from "./cases/caseDatabase";

function App() {
  const { state, dispatch } = useGame();
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showPassScreen, setShowPassScreen] = useState(false);
  const [lastGradingResult, setLastGradingResult] = useState<{
    points: number;
    severeMiss: boolean;
  } | null>(null);

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
        <Scorebar players={state.players} currentTurnIndex={state.turnIndex} />
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

  // Handle prompt phase
  if (state.phase === "prompt" && state.activePrompt) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <Scorebar players={state.players} currentTurnIndex={state.turnIndex} />

        <div className="mb-6">
          <h3 className="text-center text-xl font-bold text-gray-700">
            {currentPlayer.name}'s Turn
          </h3>
        </div>

        <Timer timeRemaining={timeRemaining} totalTime={state.activePrompt.timeLimit} />

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
            dispatch({ type: "USE_HINT" });
            alert("Hint: A 5-word hint about this case. (Not implemented in MVP)");
          }}
          creditsAvailable={currentPlayer.credits}
        />
      </div>
    );
  }

  // Handle grading phase - show results briefly then transition
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

  // Handle transition phase - move to next turn
  if (state.phase === "transition") {
    setTimeout(() => {
      dispatch({ type: "END_TURN" });
      setShowPassScreen(false);
      setLastGradingResult(null);
    }, 1500);

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <Scorebar players={state.players} currentTurnIndex={state.turnIndex} />
        <Board board={state.board} players={state.players} />

        <div className="text-center mt-8">
          <div className="text-2xl font-bold text-gray-700">
            Position updated! Next turn...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Scorebar players={state.players} currentTurnIndex={state.turnIndex} />
      <Board board={state.board} players={state.players} />
    </div>
  );
}

export default App;
