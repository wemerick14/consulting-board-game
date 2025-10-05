import type { Player } from "../types";

interface ScorebarProps {
  players: Player[];
  currentTurnIndex: number;
}

export function Scorebar({ players, currentTurnIndex }: ScorebarProps) {
  return (
    <div className="w-full max-w-6xl mx-auto mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {players.map((player, idx) => (
          <div
            key={player.id}
            className={`border-2 rounded-lg p-4 ${
              idx === currentTurnIndex
                ? 'border-blue-500 bg-blue-50 shadow-lg'
                : 'border-gray-300 bg-white'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="font-bold text-lg">{player.name}</div>
                <div className="text-sm text-gray-600">{player.rank}</div>
              </div>
              <div
                className="w-10 h-10 rounded-full border-2 border-white shadow-md flex items-center justify-center font-bold text-white"
                style={{ backgroundColor: getPlayerColor(player.id) }}
              >
                {player.name[0]}
              </div>
            </div>

            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Points:</span>
                <span className="font-semibold">{player.points}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Position:</span>
                <span className="font-semibold">#{player.position}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Streak:</span>
                <span className="font-semibold">
                  {Array.from({ length: player.streak }, (_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                  {player.streak === 0 && '-'}
                </span>
              </div>
            </div>

            {idx === currentTurnIndex && (
              <div className="mt-3 text-center text-sm font-semibold text-blue-600">
                Current Turn
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function getPlayerColor(playerId: string): string {
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];
  const index = parseInt(playerId.replace('player-', '')) % colors.length;
  return colors[index];
}
