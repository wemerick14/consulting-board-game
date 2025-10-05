import { useState } from "react";
import type { Player, GameSettings } from "../types";

interface SetupScreenProps {
  onStart: (players: Player[], settings: GameSettings) => void;
}

export function SetupScreen({ onStart }: SetupScreenProps) {
  const [numPlayers, setNumPlayers] = useState(2);
  const [playerNames, setPlayerNames] = useState(["Player 1", "Player 2"]);
  const [timerSecs, setTimerSecs] = useState<60 | 75 | 90>(75);
  const [session, setSession] = useState<"short" | "standard">("standard");

  const handleNumPlayersChange = (num: number) => {
    setNumPlayers(num);
    const names = [];
    for (let i = 0; i < num; i++) {
      names.push(playerNames[i] || `Player ${i + 1}`);
    }
    setPlayerNames(names);
  };

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleStart = () => {
    const players: Player[] = playerNames.map((name, idx) => ({
      id: `player-${idx}`,
      name: name || `Player ${idx + 1}`,
      points: 0,
      position: 0,
      streak: 0,
      rank: "Analyst",
      credits: {
        add60: 2,
        googlePeek: 1,
        fiveWordHint: 1
      }
    }));

    const settings: GameSettings = {
      timerSecs,
      session
    };

    onStart(players, settings);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Consulting Career Board Game
          </h1>
          <p className="text-gray-600">
            Race from Analyst to Retirement by solving case interviews!
          </p>
        </div>

        {/* Number of players */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Players
          </label>
          <div className="flex gap-2">
            {[2, 3, 4].map(num => (
              <button
                key={num}
                onClick={() => handleNumPlayersChange(num)}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                  numPlayers === num
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {num} Players
              </button>
            ))}
          </div>
        </div>

        {/* Player names */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Player Names
          </label>
          <div className="space-y-2">
            {playerNames.map((name, idx) => (
              <input
                key={idx}
                type="text"
                value={name}
                onChange={(e) => handleNameChange(idx, e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder={`Player ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Timer settings */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time per Question
          </label>
          <div className="flex gap-2">
            {[60, 75, 90].map(secs => (
              <button
                key={secs}
                onClick={() => setTimerSecs(secs as 60 | 75 | 90)}
                className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                  timerSecs === secs
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {secs}s
              </button>
            ))}
          </div>
        </div>

        {/* Session length */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Session Length
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setSession("short")}
              className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                session === "short"
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Short (~30 min)
            </button>
            <button
              onClick={() => setSession("standard")}
              className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                session === "standard"
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Standard (~60 min)
            </button>
          </div>
        </div>

        {/* Start button */}
        <button
          onClick={handleStart}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors shadow-lg"
        >
          Start Game
        </button>

        {/* Game info */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">How to Play:</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Answer case interview questions to move forward</li>
            <li>• Earn points based on accuracy (closer = more points)</li>
            <li>• Build a streak for bonus movement</li>
            <li>• Use credits wisely (each costs 1 point)</li>
            <li>• First to Retirement wins!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
