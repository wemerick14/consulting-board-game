import type { Player } from "../types";

interface SummaryModalProps {
  players: Player[];
  promptsCompleted: number;
  sessionDuration: number; // in seconds
  onRematch: () => void;
}

export function SummaryModal({
  players,
  promptsCompleted,
  sessionDuration,
  onRematch
}: SummaryModalProps) {
  // Sort players by points descending
  const sortedPlayers = [...players].sort((a, b) => b.points - a.points);
  const winner = sortedPlayers[0];

  const minutes = Math.floor(sessionDuration / 60);
  const seconds = sessionDuration % 60;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Game Over!</h2>
          <p className="text-xl text-gray-600">
            <span className="font-bold text-blue-600">{winner.name}</span> wins!
          </p>
        </div>

        {/* Leaderboard */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-gray-700">Final Standings</h3>
          <div className="space-y-3">
            {sortedPlayers.map((player, idx) => (
              <div
                key={player.id}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  idx === 0
                    ? 'bg-yellow-100 border-2 border-yellow-400'
                    : 'bg-gray-50 border border-gray-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-gray-500">
                    #{idx + 1}
                  </div>
                  <div>
                    <div className="font-bold text-lg">{player.name}</div>
                    <div className="text-sm text-gray-600">{player.rank}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{player.points} pts</div>
                  <div className="text-sm text-gray-600">
                    Streak: {player.streak} {Array.from({ length: Math.min(player.streak, 3) }, () => '⭐').join('')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Session stats */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold mb-3 text-gray-700">Session Stats</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-600">Total Cases</div>
              <div className="text-xl font-semibold">{promptsCompleted}</div>
            </div>
            <div>
              <div className="text-gray-600">Duration</div>
              <div className="text-xl font-semibold">{minutes}m {seconds}s</div>
            </div>
            <div>
              <div className="text-gray-600">Avg Points/Case</div>
              <div className="text-xl font-semibold">
                {promptsCompleted > 0
                  ? (players.reduce((sum, p) => sum + p.points, 0) / (promptsCompleted * players.length)).toFixed(1)
                  : '0.0'}
              </div>
            </div>
            <div>
              <div className="text-gray-600">Winner's Position</div>
              <div className="text-xl font-semibold">#{winner.position}</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <button
          onClick={onRematch}
          className="w-full py-4 bg-blue-600 text-white text-xl font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
