interface ForkChoiceModalProps {
  fromTile: number;
  options: number[];
  onChoosePath: (targetTile: number) => void;
}

export function ForkChoiceModal({ fromTile, onChoosePath }: ForkChoiceModalProps) {
  // Determine which fork this is based on tile number
  const isFirstFork = fromTile === 6;

  const safeOption = isFirstFork ? 7 : 13;
  const riskOption = isFirstFork ? 20 : 23;

  const forkTitle = isFirstFork ? "Fork 1: Career Crossroads" : "Fork 2: Final Push";
  const riskTitle = isFirstFork ? "🚀 Startup Detour" : "💼 M&A Fast Track";
  const riskDesc = isFirstFork
    ? "Join a high-growth startup. Risk: Harder questions. Reward: Skip ahead to Manager if successful!"
    : "Lead a major M&A deal. Risk: Expert-level case. Reward: Skip straight to Partner!";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">{forkTitle}</h2>
          <p className="text-lg text-gray-600">Choose your path wisely...</p>
        </div>

        {/* Path Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Safe Path */}
          <button
            onClick={() => onChoosePath(safeOption)}
            className="group relative bg-gradient-to-br from-green-50 to-blue-50 border-3 border-green-400 rounded-xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <div className="absolute top-3 right-3 text-3xl">🛡️</div>
            <h3 className="text-2xl font-bold text-green-700 mb-3 mt-2">Safe Path</h3>
            <p className="text-gray-700 mb-4">
              Continue on the traditional consulting track. Steady progression, standard questions.
            </p>
            <div className="bg-white rounded-lg p-3 text-sm text-gray-600">
              <div className="font-semibold mb-1">What you get:</div>
              <ul className="list-disc list-inside space-y-1">
                <li>Standard difficulty questions</li>
                <li>Guaranteed forward progress</li>
                <li>Career milestone checkpoints</li>
              </ul>
            </div>
            <div className="mt-4 text-center">
              <span className="inline-block bg-green-500 text-white px-4 py-2 rounded-full font-semibold group-hover:bg-green-600 transition-colors">
                Choose Safe →
              </span>
            </div>
          </button>

          {/* Risk Path */}
          <button
            onClick={() => onChoosePath(riskOption)}
            className="group relative bg-gradient-to-br from-red-50 to-orange-50 border-3 border-red-400 rounded-xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <div className="absolute top-3 right-3 text-3xl">{isFirstFork ? "🚀" : "💼"}</div>
            <h3 className="text-2xl font-bold text-red-700 mb-3 mt-2">{riskTitle}</h3>
            <p className="text-gray-700 mb-4">{riskDesc}</p>
            <div className="bg-white rounded-lg p-3 text-sm text-gray-600 mb-2">
              <div className="font-semibold mb-1">High risk, high reward:</div>
              <ul className="list-disc list-inside space-y-1">
                <li className="text-orange-600">Harder questions ahead</li>
                <li className="text-green-600">Potential to skip promotions</li>
                <li className="text-blue-600">Special event opportunities</li>
              </ul>
            </div>
            <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-2 text-xs text-yellow-800 mb-3">
              ⚠️ Warning: Failure may set you back!
            </div>
            <div className="mt-4 text-center">
              <span className="inline-block bg-red-500 text-white px-4 py-2 rounded-full font-semibold group-hover:bg-red-600 transition-colors">
                Take the Risk →
              </span>
            </div>
          </button>
        </div>

        {/* Footer Info */}
        <div className="text-center text-sm text-gray-500">
          <p>💡 Tip: Risk paths offer shortcuts but require excellent performance</p>
        </div>
      </div>
    </div>
  );
}
