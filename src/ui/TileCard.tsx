import { useState } from "react";
import type { PromptInstance } from "../types";

interface TileCardProps {
  prompt: PromptInstance;
  timeRemaining: number;
  onSubmit: (answer: number) => void;
  onUseAdd60?: () => void;
  onUseGooglePeek?: () => void;
  onUseHint?: () => void;
  creditsAvailable: { add60: number; googlePeek: number; fiveWordHint: number };
}

export function TileCard({
  prompt,
  timeRemaining,
  onSubmit,
  onUseAdd60,
  onUseGooglePeek,
  onUseHint,
  creditsAvailable
}: TileCardProps) {
  const [answer, setAnswer] = useState<string>("");
  const [selectedMcq, setSelectedMcq] = useState<number | null>(null);

  const handleSubmit = () => {
    if (prompt.decision.type === "numeric") {
      const numAnswer = parseFloat(answer);
      if (!isNaN(numAnswer)) {
        onSubmit(numAnswer);
      }
    } else {
      if (selectedMcq !== null) {
        onSubmit(selectedMcq);
      }
    }
  };

  const isTimeUp = timeRemaining <= 0;
  const canSubmit = prompt.decision.type === "numeric"
    ? answer.trim() !== "" && !isNaN(parseFloat(answer))
    : selectedMcq !== null;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
      {/* Prompt text */}
      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-2">Case Question</div>
        <p className="text-lg leading-relaxed">{prompt.filledStem}</p>
      </div>

      {/* Answer input */}
      <div className="mb-6">
        {prompt.decision.type === "numeric" ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Answer:
            </label>
            <input
              type="number"
              step="any"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={isTimeUp}
              className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-amber-500 disabled:bg-gray-100"
              placeholder="Enter your answer..."
              autoFocus
            />
          </div>
        ) : (
          <div>
            <div className="block text-sm font-medium text-gray-700 mb-3">
              Select your answer:
            </div>
            <div className="space-y-2">
              {prompt.decision.options?.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedMcq(idx)}
                  disabled={isTimeUp}
                  className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-colors
                    ${selectedMcq === idx
                      ? 'border-blue-950 bg-gradient-to-r from-blue-50 to-amber-50 ring-2 ring-amber-500'
                      : 'border-gray-300 bg-white hover:border-blue-900'
                    }
                    disabled:bg-gray-100 disabled:cursor-not-allowed
                  `}
                >
                  <span className="font-semibold mr-2">{String.fromCharCode(65 + idx)}.</span>
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Credits bar */}
      <div className="mb-6 flex gap-2 flex-wrap">
        <button
          onClick={onUseAdd60}
          disabled={creditsAvailable.add60 === 0 || isTimeUp}
          className="px-3 py-2 text-sm bg-amber-100 border-2 border-amber-500 rounded-lg hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-amber-900"
        >
          ⏰ +60s ({creditsAvailable.add60})
        </button>
        <button
          onClick={onUseGooglePeek}
          disabled={creditsAvailable.googlePeek === 0 || isTimeUp}
          className="px-3 py-2 text-sm bg-blue-100 border-2 border-blue-900 rounded-lg hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-blue-950"
        >
          🔍 Google Peek ({creditsAvailable.googlePeek})
        </button>
        <button
          onClick={onUseHint}
          disabled={creditsAvailable.fiveWordHint === 0 || isTimeUp}
          className="px-3 py-2 text-sm bg-amber-100 border-2 border-amber-500 rounded-lg hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-amber-900"
        >
          💡 Hint ({creditsAvailable.fiveWordHint})
        </button>
      </div>

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={!canSubmit || isTimeUp}
        className="w-full py-4 text-lg font-bold bg-gradient-to-r from-blue-900 to-blue-950 hover:from-blue-800 hover:to-blue-900 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-amber-500 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:border-gray-400 disabled:transform-none"
      >
        {isTimeUp ? "Time's Up!" : "Submit Answer"}
      </button>

      {isTimeUp && (
        <div className="mt-4 text-center text-red-600 font-medium">
          Time expired! Click Submit to continue.
        </div>
      )}
    </div>
  );
}
