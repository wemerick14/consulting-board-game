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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full border-4 border-amber-500">
        <div className="text-center mb-8">
          {/* Brand Logo/Title */}
          <div className="mb-6">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-900 to-blue-950 bg-clip-text text-transparent mb-3">
              THE PARTNER TRACK
            </h1>
            <div className="h-1 w-48 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 mx-auto rounded-full mb-4"></div>
          </div>
          <p className="text-gray-700 text-lg font-medium">
            Race from Analyst to Partner by mastering case interviews
          </p>
          <p className="text-gray-500 text-sm mt-1">
            A premium consulting career simulation
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
                    ? 'bg-gradient-to-r from-blue-900 to-blue-950 text-white border-2 border-amber-500'
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
                    ? 'bg-gradient-to-r from-blue-900 to-blue-950 text-white border-2 border-amber-500'
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
                  ? 'bg-gradient-to-r from-blue-900 to-blue-950 text-white border-2 border-amber-500'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Short (~30 min)
            </button>
            <button
              onClick={() => setSession("standard")}
              className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                session === "standard"
                  ? 'bg-gradient-to-r from-blue-900 to-blue-950 text-white border-2 border-amber-500'
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
          className="w-full py-5 bg-gradient-to-r from-blue-900 to-blue-950 hover:from-blue-800 hover:to-blue-900 text-white text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-amber-500"
        >
          Begin Your Journey to Partner
        </button>

        {/* Game info */}
        <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-amber-50 rounded-xl border-2 border-amber-200">
          <h3 className="font-bold text-blue-950 mb-3 text-lg">How to Play:</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• <strong>Master case interviews</strong> to advance your consulting career</li>
            <li>• <strong>Earn points</strong> based on analytical accuracy and speed</li>
            <li>• <strong>Build momentum</strong> with answer streaks for accelerated growth</li>
            <li>• <strong>Use power-ups strategically</strong> - each credit costs 1 point</li>
            <li>• <strong>First to Partner</strong> (retirement) wins the game!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
