import { getEventById } from "../logic/events";
import type { EventOutcome } from "../types";

interface EventModalProps {
  eventId: string;
  outcome?: EventOutcome;
  onChooseOption?: (choiceIndex: number) => void;
  onContinue?: () => void;
}

export function EventModal({ eventId, outcome, onChooseOption, onContinue }: EventModalProps) {
  const event = getEventById(eventId);

  if (!event) {
    return null;
  }

  const isChoiceEvent = event.type === "choice" && !outcome;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full animate-fade-in">
        {/* Event Header */}
        <div className="text-center mb-6">
          <div className="text-7xl mb-4">{event.emoji}</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{event.name}</h2>
          <p className="text-lg text-gray-600">{event.description}</p>
        </div>

        {/* Choice Event - Show Options */}
        {isChoiceEvent && event.choices && (
          <div className="space-y-3 mb-6">
            <p className="text-center font-semibold text-gray-700 mb-4">What will you do?</p>
            {event.choices.map((choice, idx) => (
              <button
                key={idx}
                onClick={() => onChooseOption?.(idx)}
                className="w-full p-4 text-left border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
              >
                <div className="font-semibold text-gray-800 group-hover:text-blue-600">
                  {choice.text}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Simple Event or Resolved Outcome - Show Result */}
        {!isChoiceEvent && (
          <div className="bg-gradient-to-r from-blue-50 to-amber-50 rounded-xl p-6 mb-6 border-2 border-amber-500">
            <h3 className="text-xl font-bold text-center text-blue-950 mb-4">
              {event.type === "positive" ? "✨ Career Win!" : event.type === "negative" ? "⚠️ Setback!" : "🎲 Outcome"}
            </h3>

            {outcome && (
              <div className="space-y-2 text-center">
                {outcome.pointsChange !== undefined && outcome.pointsChange !== 0 && (
                  <div className={`text-2xl font-bold ${outcome.pointsChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {outcome.pointsChange > 0 ? '+' : ''}{outcome.pointsChange} Points
                  </div>
                )}
                {outcome.positionChange !== undefined && outcome.positionChange !== 0 && (
                  <div className={`text-xl font-semibold ${outcome.positionChange > 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                    Move {outcome.positionChange > 0 ? 'forward' : 'backward'} {Math.abs(outcome.positionChange)} {Math.abs(outcome.positionChange) === 1 ? 'space' : 'spaces'}
                  </div>
                )}
                {outcome.creditsChange && (
                  <div className="text-lg text-purple-600">
                    {outcome.creditsChange.add60 && (
                      <div>{outcome.creditsChange.add60 > 0 ? '+' : ''}{outcome.creditsChange.add60} Add60 credits</div>
                    )}
                    {outcome.creditsChange.fiveWordHint && (
                      <div>{outcome.creditsChange.fiveWordHint > 0 ? '+' : ''}{outcome.creditsChange.fiveWordHint} Hint credits</div>
                    )}
                    {outcome.creditsChange.googlePeek && (
                      <div>{outcome.creditsChange.googlePeek > 0 ? '+' : ''}{outcome.creditsChange.googlePeek} Google Peek credits</div>
                    )}
                  </div>
                )}
                {outcome.toleranceBoost && (
                  <div className="text-lg text-green-600 font-semibold">
                    🎓 Your next question will have doubled tolerance!
                  </div>
                )}
                {outcome.difficultyOverride && (
                  <div className="text-lg text-orange-600 font-semibold">
                    ⚠️ Your next question will be a {outcome.difficultyOverride === "full" ? "Full Case" : "Quick Math"}!
                  </div>
                )}
              </div>
            )}

            {!outcome && event.effect && (
              <div className="space-y-2 text-center">
                {event.effect.pointsChange !== undefined && event.effect.pointsChange !== 0 && (
                  <div className={`text-2xl font-bold ${event.effect.pointsChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {event.effect.pointsChange > 0 ? '+' : ''}{event.effect.pointsChange} Points
                  </div>
                )}
                {event.effect.positionChange !== undefined && event.effect.positionChange !== 0 && (
                  <div className={`text-xl font-semibold ${event.effect.positionChange > 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                    Move {event.effect.positionChange > 0 ? 'forward' : 'backward'} {Math.abs(event.effect.positionChange)} {Math.abs(event.effect.positionChange) === 1 ? 'space' : 'spaces'}
                  </div>
                )}
                {event.effect.creditsChange && (
                  <div className="text-lg text-purple-600">
                    {event.effect.creditsChange.add60 && (
                      <div>{event.effect.creditsChange.add60 > 0 ? '+' : ''}{event.effect.creditsChange.add60} Add60 credits</div>
                    )}
                    {event.effect.creditsChange.fiveWordHint && (
                      <div>{event.effect.creditsChange.fiveWordHint > 0 ? '+' : ''}{event.effect.creditsChange.fiveWordHint} Hint credits</div>
                    )}
                  </div>
                )}
                {event.effect.toleranceBoost && (
                  <div className="text-lg text-green-600 font-semibold">
                    🎓 Your next question will have doubled tolerance!
                  </div>
                )}
                {event.effect.difficultyOverride && (
                  <div className="text-lg text-orange-600 font-semibold">
                    ⚠️ Your next question will be a {event.effect.difficultyOverride === "full" ? "Full Case" : "Quick Math"}!
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Continue Button - Only for simple/resolved events */}
        {!isChoiceEvent && (
          <button
            onClick={() => {
              if (onContinue) {
                onContinue();
              }
            }}
            disabled={!onContinue}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}
