interface TimerProps {
  timeRemaining: number;
  totalTime: number;
}

export function Timer({ timeRemaining, totalTime }: TimerProps) {
  const percentage = Math.max(0, (timeRemaining / totalTime) * 100);
  const isLowTime = timeRemaining <= 15;
  const isVeryLowTime = timeRemaining <= 5;

  return (
    <div className="w-full max-w-3xl mx-auto mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600">Time Remaining</span>
        <span className={`text-2xl font-bold ${isVeryLowTime ? 'text-red-600 animate-pulse' : isLowTime ? 'text-orange-500' : 'text-gray-800'}`}>
          {timeRemaining}s
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ${
            isVeryLowTime
              ? 'bg-red-500'
              : isLowTime
              ? 'bg-orange-400'
              : 'bg-blue-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
