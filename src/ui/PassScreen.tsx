interface PassScreenProps {
  playerName: string;
  onContinue: () => void;
}

export function PassScreen({ playerName, onContinue }: PassScreenProps) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-2xl w-full text-center border-4 border-amber-500">
        {/* Brand Header */}
        <div className="mb-8">
          <div className="text-5xl font-bold bg-gradient-to-r from-blue-900 to-blue-950 bg-clip-text text-transparent mb-2">
            THE PARTNER TRACK
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 mx-auto rounded-full"></div>
        </div>

        {/* Player Transition */}
        <div className="mb-6">
          <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Next to Present
          </div>
          <div className="text-5xl font-bold text-blue-950 mb-6">
            {playerName}
          </div>
        </div>

        {/* Consulting-themed message */}
        <div className="bg-gradient-to-r from-blue-50 to-amber-50 rounded-xl p-6 mb-8">
          <p className="text-gray-700 text-lg font-medium">
            📊 Prepare to showcase your analytical excellence
          </p>
          <p className="text-gray-600 text-sm mt-2">
            The client is waiting. It's your time to shine.
          </p>
        </div>

        {/* Ready Button */}
        <button
          onClick={onContinue}
          className="px-12 py-5 bg-gradient-to-r from-blue-900 to-blue-950 hover:from-blue-800 hover:to-blue-900 text-white text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-amber-500"
        >
          I'm Ready to Present
        </button>

        <div className="mt-6 text-xs text-gray-400 italic">
          "Excellence is not a destination; it is a continuous journey."
        </div>
      </div>
    </div>
  );
}
