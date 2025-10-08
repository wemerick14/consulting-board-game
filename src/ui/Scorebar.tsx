import { useState } from "react";
import type { Player } from "../types";

interface ScorebarProps {
  players: Player[];
  currentTurnIndex: number;
  onResetGame?: () => void;
}

export function Scorebar({ players, currentTurnIndex, onResetGame }: ScorebarProps) {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto mb-6">
      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full border-2 border-amber-500">
            <h3 className="text-xl font-bold text-blue-950 mb-3">
              Reset Game?
            </h3>
            <p className="text-gray-600 mb-6">
              This will clear all progress and return to setup. Are you sure?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowResetConfirm(false);
                  onResetGame?.();
                }}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-900 to-blue-950 hover:from-blue-800 hover:to-blue-900 text-white font-semibold rounded-lg transition-colors border border-amber-500"
              >
                Reset Game
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Button */}
      {onResetGame && (
        <div className="flex justify-end mb-3">
          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-4 py-2 text-sm bg-gradient-to-r from-blue-900 to-blue-950 hover:from-blue-800 hover:to-blue-900 text-white border border-amber-500 rounded-lg transition-colors font-medium"
          >
            🔄 Reset Game
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {players.map((player, idx) => (
          <div
            key={player.id}
            className={`border-2 rounded-lg p-4 ${
              idx === currentTurnIndex
                ? 'border-blue-950 bg-gradient-to-br from-blue-50 to-amber-50 shadow-lg ring-2 ring-amber-500'
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
              <div className="mt-3 text-center">
                <div className="text-sm font-bold text-blue-950">Current Turn</div>
                <div className="h-0.5 w-16 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-1 rounded-full"></div>
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
