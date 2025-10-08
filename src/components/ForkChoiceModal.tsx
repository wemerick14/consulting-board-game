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
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 bg-opacity-95 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full border-4 border-amber-500">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-900 to-blue-950 bg-clip-text text-transparent mb-2">{forkTitle}</h2>
          <div className="h-1 w-32 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 mx-auto rounded-full mb-3"></div>
          <p className="text-lg text-gray-600">Choose your path wisely...</p>
        </div>

        {/* Path Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Safe Path */}
          <button
            onClick={() => onChoosePath(safeOption)}
            className="group relative bg-gradient-to-br from-blue-50 to-amber-50 border-3 border-blue-900 rounded-xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <div className="absolute top-3 right-3 text-3xl">🛡️</div>
            <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">Traditional Track</div>
            <h3 className="text-2xl font-bold text-blue-950 mb-3 mt-8">Safe Path</h3>
            <p className="text-gray-700 mb-4">
              Continue on the traditional consulting track. Steady progression, standard questions.
            </p>
            <div className="bg-white rounded-lg p-3 text-sm text-gray-600">
              <div className="font-semibold mb-1 text-blue-950">What you get:</div>
              <ul className="list-disc list-inside space-y-1">
                <li>Standard difficulty questions</li>
                <li>Guaranteed forward progress</li>
                <li>Career milestone checkpoints</li>
              </ul>
            </div>
            <div className="mt-4 text-center">
              <span className="inline-block bg-gradient-to-r from-blue-900 to-blue-950 text-white px-4 py-2 rounded-full font-semibold group-hover:from-blue-800 group-hover:to-blue-900 transition-colors border border-amber-500">
                Choose Safe →
              </span>
            </div>
          </button>

          {/* Risk Path */}
          <button
            onClick={() => onChoosePath(riskOption)}
            className="group relative bg-gradient-to-br from-red-50 to-orange-50 border-3 border-red-500 rounded-xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <div className="absolute top-3 right-3 text-3xl">{isFirstFork ? "🚀" : "💼"}</div>
            <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">Fast Track</div>
            <h3 className="text-2xl font-bold text-red-700 mb-3 mt-8">{riskTitle}</h3>
            <p className="text-gray-700 mb-4">{riskDesc}</p>
            <div className="bg-white rounded-lg p-3 text-sm text-gray-600 mb-2">
              <div className="font-semibold mb-1 text-blue-950">High risk, high reward:</div>
              <ul className="list-disc list-inside space-y-1">
                <li className="text-orange-600">Harder questions ahead</li>
                <li className="text-amber-600">Potential to skip promotions</li>
                <li className="text-blue-950">Special event opportunities</li>
              </ul>
            </div>
            <div className="bg-amber-100 border-2 border-amber-500 rounded-lg p-2 text-xs text-amber-900 mb-3 font-semibold">
              ⚠️ Warning: Failure may set you back!
            </div>
            <div className="mt-4 text-center">
              <span className="inline-block bg-red-500 text-white px-4 py-2 rounded-full font-semibold group-hover:bg-red-600 transition-colors border border-amber-500">
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
