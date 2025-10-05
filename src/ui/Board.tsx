import type { Tile, Player } from "../types";

interface BoardProps {
  board: Tile[];
  players: Player[];
}

export function Board({ board, players }: BoardProps) {
  const renderTile = (tile: Tile, index: number) => {
    const playersOnTile = players.filter(p => p.position === index);

    const tileClass = `
      relative border-2 rounded-lg p-2 min-h-[60px] flex flex-col items-center justify-center
      ${tile.kind === 'promotion' ? 'border-yellow-500 bg-yellow-50' : ''}
      ${tile.kind === 'riskFork' ? 'border-red-500 bg-red-50' : ''}
      ${tile.kind === 'normal' ? 'border-gray-300 bg-white' : ''}
      ${tile.kind === 'event' ? 'border-purple-500 bg-purple-50' : ''}
    `;

    return (
      <div key={tile.id} className={tileClass}>
        <div className="text-xs font-bold text-gray-600">#{index}</div>
        {tile.label && (
          <div className="text-xs font-semibold text-center mt-1">{tile.label}</div>
        )}

        {/* Render player tokens */}
        {playersOnTile.length > 0 && (
          <div className="flex gap-1 mt-1">
            {playersOnTile.map(p => (
              <div
                key={p.id}
                className="w-5 h-5 rounded-full border-2 border-white shadow-md text-xs flex items-center justify-center font-bold"
                style={{ backgroundColor: getPlayerColor(p.id) }}
                title={p.name}
              >
                {p.name[0]}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">Consulting Career Path</h2>
        <p className="text-center text-gray-600 text-sm">Race from Analyst to Retirement!</p>
      </div>

      {/* Main path (0-18) */}
      <div className="grid grid-cols-10 gap-2 mb-8">
        {board.slice(0, 19).map((tile, idx) => renderTile(tile, idx))}
      </div>

      {/* Risk routes */}
      <div className="grid grid-cols-2 gap-8">
        {/* Risk Route 1 */}
        <div className="border-2 border-red-300 rounded-lg p-3 bg-red-50">
          <h3 className="text-sm font-bold text-red-700 mb-2">Risk Route 1: Startup Detour</h3>
          <div className="grid grid-cols-3 gap-2">
            {board.slice(20, 23).map((tile, idx) => renderTile(tile, 20 + idx))}
          </div>
        </div>

        {/* Risk Route 2 */}
        <div className="border-2 border-red-300 rounded-lg p-3 bg-red-50">
          <h3 className="text-sm font-bold text-red-700 mb-2">Risk Route 2: Big Bet M&A</h3>
          <div className="grid grid-cols-3 gap-2">
            {board.slice(23, 26).map((tile, idx) => renderTile(tile, 23 + idx))}
          </div>
        </div>
      </div>
    </div>
  );
}

function getPlayerColor(playerId: string): string {
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];
  const index = parseInt(playerId.replace('player-', '')) % colors.length;
  return colors[index];
}
