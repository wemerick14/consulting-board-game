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
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 bg-opacity-95 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border-4 border-amber-500">
        <div className="text-center mb-8">
          <div className="text-7xl mb-4">🏆</div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-900 to-blue-950 bg-clip-text text-transparent mb-3">
            Partner Achieved!
          </h2>
          <div className="h-1 w-48 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 mx-auto rounded-full mb-4"></div>
          <p className="text-2xl text-gray-700">
            <span className="font-bold text-blue-950">{winner.name}</span> made Partner!
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
                    ? 'bg-gradient-to-r from-amber-100 to-amber-50 border-3 border-amber-500 shadow-lg'
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
                  <div className="text-2xl font-bold text-blue-950">{player.points} pts</div>
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
          className="w-full py-5 bg-gradient-to-r from-blue-900 to-blue-950 hover:from-blue-800 hover:to-blue-900 text-white text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-amber-500"
        >
          Start New Career Journey
        </button>
      </div>
    </div>
  );
}
