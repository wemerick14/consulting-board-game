import type { Tile } from "../types";

/**
 * Create the game board with 18 spaces and 2 risk routes
 */
export function createBoard(): Tile[] {
  const board: Tile[] = [];

  // 0-5: Associate to first fork
  for (let i = 0; i <= 5; i++) {
    board.push({
      id: `tile-${i}`,
      kind: i === 2 ? "promotion" : (i === 4 ? "event" : "normal"),
      next: [i + 1],
      label: i === 2 ? "Analyst" : (i === 4 ? "Networking" : undefined),
      eventId: i === 4 ? "networking-win" : undefined
    });
  }

  // 6: First fork (normal route or risk route 1)
  board.push({
    id: "tile-6",
    kind: "riskFork",
    next: [7, 20], // 7=normal, 20=risk1
    label: "Risk or Safe?"
  });

  // 7-11: Normal path to second fork
  for (let i = 7; i <= 11; i++) {
    board.push({
      id: `tile-${i}`,
      kind: i === 8 ? "promotion" : (i === 7 ? "event" : (i === 10 ? "event" : "normal")),
      next: [i + 1],
      label: i === 8 ? "Sr Analyst" : (i === 7 ? "Staffing" : (i === 10 ? "Client Crisis" : undefined)),
      eventId: i === 7 ? "staffing-crunch" : (i === 10 ? "client-crisis" : undefined)
    });
  }

  // 12: Second fork (normal route or risk route 2)
  board.push({
    id: "tile-12",
    kind: "riskFork",
    next: [13, 23], // 13=normal, 23=risk2
    label: "Final Push?"
  });

  // 13-17: Normal path to retirement
  for (let i = 13; i <= 17; i++) {
    board.push({
      id: `tile-${i}`,
      kind: i === 14 ? "promotion" : (i === 16 ? "promotion" : (i === 15 ? "event" : "normal")),
      next: i === 17 ? [18] : [i + 1],
      label: i === 14 ? "Manager" : (i === 16 ? "Director" : (i === 15 ? "Promotion?" : undefined)),
      eventId: i === 15 ? "promotion-review" : undefined
    });
  }

  // 18: Retirement (end)
  board.push({
    id: "tile-18",
    kind: "promotion",
    next: [],
    label: "Retirement"
  });

  // 20-22: Risk Route 1 - Startup Detour (rejoins at 13)
  board.push({
    id: "tile-20-risk1",
    kind: "normal",
    next: [21],
    label: "🚀 Join Startup"
  });
  board.push({
    id: "tile-21-risk1",
    kind: "event",
    next: [22],
    label: "Pivot?",
    eventId: "startup-pivot"
  });
  board.push({
    id: "tile-22-risk1",
    kind: "normal",
    next: [13], // Rejoin at Manager level
    label: "Exit Strategy"
  });

  // 23-25: Risk Route 2 - M&A Fast Track (can skip to 18)
  board.push({
    id: "tile-23-risk2",
    kind: "normal",
    next: [24],
    label: "💼 Lead M&A"
  });
  board.push({
    id: "tile-24-risk2",
    kind: "event",
    next: [25],
    label: "Deal Closes",
    eventId: "deal-closes"
  });
  board.push({
    id: "tile-25-risk2",
    kind: "normal",
    next: [18], // Can skip to Partner if event successful
    label: "Partner Track"
  });

  return board;
}

/**
 * Get rank name based on position
 */
export function getRankFromPosition(position: number): string {
  if (position <= 2) return "Associate";
  if (position <= 8) return "Analyst";
  if (position <= 14) return "Sr Analyst";
  if (position <= 16) return "Manager";
  if (position <= 17) return "Director";
  if (position === 18) return "Partner";
  return "Retired";
}
