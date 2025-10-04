interface PassScreenProps {
  playerName: string;
  onContinue: () => void;
}

export function PassScreen({ playerName, onContinue }: PassScreenProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-12 max-w-md text-center">
        <div className="text-6xl mb-6">🎯</div>
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Pass Device to
        </h2>
        <div className="text-4xl font-bold text-blue-600 mb-8">
          {playerName}
        </div>
        <p className="text-gray-600 mb-8">
          Make sure {playerName} is ready for their turn!
        </p>
        <button
          onClick={onContinue}
          className="px-8 py-4 bg-blue-600 text-white text-xl font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          I'm Ready!
        </button>
      </div>
    </div>
  );
}
