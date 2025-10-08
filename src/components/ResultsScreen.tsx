import type { Player } from "../types";

interface Props {
  players: Player[];
  currentPlayerName: string;
  earnedPoints: number;
  isSevereMiss: boolean;
  onContinue: () => void;
}

// Career milestones
const CAREER_MILESTONES = [
  { position: 0, rank: "Associate", emoji: "💼" },
  { position: 2, rank: "Analyst", emoji: "👔" },
  { position: 8, rank: "Sr Analyst", emoji: "📊" },
  { position: 14, rank: "Manager", emoji: "📈" },
  { position: 16, rank: "Director", emoji: "🎯" },
  { position: 18, rank: "Partner", emoji: "🏆" }
];

function getNextMilestone(position: number) {
  return CAREER_MILESTONES.find(m => m.position > position) || CAREER_MILESTONES[CAREER_MILESTONES.length - 1];
}

function getProgressPercentage(position: number): number {
  return Math.min((position / 18) * 100, 100);
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
          <div className="space-y-4">
            {sortedPlayers.map((player, index) => {
              const isCurrentPlayer = player.name === currentPlayerName;
              const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "";
              const nextMilestone = getNextMilestone(player.position);
              const progressPct = getProgressPercentage(player.position);
              const positionsToRetirement = 18 - player.position;
              const positionsToNextMilestone = nextMilestone.position - player.position;

              return (
                <div
                  key={player.id}
                  className={`
                    p-4 rounded-lg transition-all
                    ${isCurrentPlayer
                      ? "bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-400 shadow-md"
                      : "bg-gray-50 border border-gray-200"
                    }
                  `}
                >
                  {/* Player Info Row */}
                  <div className="flex items-center justify-between mb-3">
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

                  {/* Career Progress Bar */}
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>👔 Analyst</span>
                      <span className="font-semibold">
                        {player.position >= 18 ? "🏆 Retired!" : `${positionsToRetirement} to retirement`}
                      </span>
                      <span>🏆 Partner</span>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                    {/* Milestones */}
                    <div className="flex justify-between text-xs">
                      {CAREER_MILESTONES.map((milestone) => (
                        <div
                          key={milestone.position}
                          className={`text-center ${
                            player.position >= milestone.position
                              ? "text-green-600 font-bold"
                              : "text-gray-400"
                          }`}
                        >
                          <div>{milestone.emoji}</div>
                          <div className="text-[10px]">
                            {milestone.rank.split(" ").map((word, i) => (
                              <div key={i}>{word}</div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    {player.position < 18 && (
                      <div className="text-center text-xs text-gray-600 mt-1">
                        Next: {nextMilestone.emoji} <strong>{nextMilestone.rank}</strong> in {positionsToNextMilestone} {positionsToNextMilestone === 1 ? "position" : "positions"}
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
          className="w-full bg-gradient-to-r from-blue-900 to-blue-950 hover:from-blue-800 hover:to-blue-900 text-white font-bold py-5 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-amber-500"
        >
          Continue to Next Presentation →
        </button>

        <div className="mt-4 text-center text-sm text-gray-500 italic">
          Review the partner track standings before proceeding
        </div>
      </div>
    </div>
  );
}
