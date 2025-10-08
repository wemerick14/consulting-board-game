import type { Difficulty } from "../types";

interface Props {
  playerName: string;
  onChooseDifficulty: (difficulty: Difficulty) => void;
}

export function ChoiceScreen({ playerName, onChooseDifficulty }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          {playerName}'s Turn
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Choose your challenge difficulty:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Math Option */}
          <button
            onClick={() => onChooseDifficulty("quick")}
            className="group relative bg-gradient-to-br from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="text-left">
              <div className="text-2xl font-bold mb-3">⚡ Quick Math</div>
              <div className="text-sm opacity-90 mb-4">
                Simple one-step calculations
              </div>
              <div className="space-y-2 text-xs opacity-80">
                <div>⏱️ Time: 25-35 seconds</div>
                <div>🎯 Points: 2 max</div>
                <div>📝 Example: Revenue, profit, percentages</div>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 text-3xl opacity-20 group-hover:opacity-30 transition-opacity">
              🧮
            </div>
          </button>

          {/* Full Case Option */}
          <button
            onClick={() => onChooseDifficulty("full")}
            className="group relative bg-gradient-to-br from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="text-left">
              <div className="text-2xl font-bold mb-3">🎓 Full Case</div>
              <div className="text-sm opacity-90 mb-4">
                Multi-step market sizing & analysis
              </div>
              <div className="space-y-2 text-xs opacity-80">
                <div>⏱️ Time: 45-75 seconds</div>
                <div>🎯 Points: 3-5 max</div>
                <div>📝 Example: Market sizing, ROI, strategy</div>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 text-3xl opacity-20 group-hover:opacity-30 transition-opacity">
              💼
            </div>
          </button>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-amber-50 rounded-xl border-2 border-amber-200">
          <p className="text-sm text-gray-700 text-center">
            💡 <strong>Strategic Insight:</strong> Quick Math builds momentum, but Full Cases accelerate your partner track!
          </p>
        </div>
      </div>
    </div>
  );
}
