import type { Player } from "../types";

interface Props {
  players: Player[];
  currentPlayerName: string;
  earnedPoints: number;
  isSevereMiss: boolean;
  onContinue: () => void;
}

export function ResultsScreen({
  players,
  currentPlayerName,
  earnedPoints,
  isSevereMiss,
  onContinue
}: Props) {
  // Sort players by points (descending) for leaderboard
  const sortedPlayers = [...players].sort((a, b) => b.points - a.points);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full">
        {/* Result Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {currentPlayerName}'s Result
          </h2>
          <div className="text-6xl mb-4">
            {earnedPoints > 0 ? (isSevereMiss ? "😬" : earnedPoints >= 4 ? "🎉" : "👍") : "😞"}
          </div>
          <div className="text-2xl font-bold mb-2">
            {isSevereMiss ? (
              <span className="text-red-600">Severe Miss!</span>
            ) : earnedPoints === 0 ? (
              <span className="text-gray-600">No Points</span>
            ) : (
              <span className="text-green-600">+{earnedPoints} Points!</span>
            )}
          </div>
          {isSevereMiss && (
            <p className="text-sm text-red-500">
              Your answer was way off - you lost a position!
            </p>
          )}
        </div>

        {/* Leaderboard */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">
            📊 Current Standings
          </h3>
          <div className="space-y-3">
            {sortedPlayers.map((player, index) => {
              const isCurrentPlayer = player.name === currentPlayerName;
              const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "";

              return (
                <div
                  key={player.id}
                  className={`
                    flex items-center justify-between p-4 rounded-lg transition-all
                    ${isCurrentPlayer
                      ? "bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-400 shadow-md"
                      : "bg-gray-50 border border-gray-200"
                    }
                  `}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="text-2xl w-8">
                      {medal || `${index + 1}.`}
                    </div>
                    <div className="flex-1">
                      <div className={`font-bold ${isCurrentPlayer ? "text-blue-700" : "text-gray-800"}`}>
                        {player.name}
                        {isCurrentPlayer && " (You)"}
                      </div>
                      <div className="text-sm text-gray-600">
                        {player.rank}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800">
                      {player.points}
                    </div>
                    <div className="text-xs text-gray-500">points</div>
                  </div>
                  <div className="ml-4 text-right">
                    <div className="text-xl font-bold text-blue-600">
                      Pos {player.position}
                    </div>
                    {player.streak > 0 && (
                      <div className="text-xs text-orange-600">
                        🔥 {player.streak} streak
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={onContinue}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Pass to Next Player →
        </button>

        <div className="mt-4 text-center text-sm text-gray-500">
          Take a moment to review the standings before continuing!
        </div>
      </div>
    </div>
  );
}
