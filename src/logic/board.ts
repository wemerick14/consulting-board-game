import { Tile } from "../types";

/**
 * Create the game board with 18 spaces and 2 risk routes
 */
export function createBoard(): Tile[] {
  const board: Tile[] = [];

  // 0-5: Analyst to first fork
  for (let i = 0; i <= 5; i++) {
    board.push({
      id: `tile-${i}`,
      kind: i === 2 ? "promotion" : "normal",
      next: [i + 1],
      label: i === 2 ? "Sr Analyst" : undefined
    });
  }

  // 6: First fork (normal route or risk route 1)
  board.push({
    id: "tile-6",
    kind: "riskFork",
    next: [7, 20], // 7=normal, 20=risk1
    label: "Fork 1"
  });

  // 7-11: Normal path to second fork
  for (let i = 7; i <= 11; i++) {
    board.push({
      id: `tile-${i}`,
      kind: i === 8 ? "promotion" : "normal",
      next: [i + 1],
      label: i === 8 ? "Associate" : undefined
    });
  }

  // 12: Second fork (normal route or risk route 2)
  board.push({
    id: "tile-12",
    kind: "riskFork",
    next: [13, 23], // 13=normal, 23=risk2
    label: "Fork 2"
  });

  // 13-17: Normal path to retirement
  for (let i = 13; i <= 17; i++) {
    board.push({
      id: `tile-${i}`,
      kind: i === 14 ? "promotion" : (i === 16 ? "promotion" : "normal"),
      next: i === 17 ? [18] : [i + 1],
      label: i === 14 ? "Manager" : (i === 16 ? "Director" : undefined)
    });
  }

  // 18: Retirement (end)
  board.push({
    id: "tile-18",
    kind: "promotion",
    next: [],
    label: "Retirement"
  });

  // 20-22: Risk Route 1 (rejoins at 13)
  for (let i = 20; i <= 22; i++) {
    board.push({
      id: `tile-${i}-risk1`,
      kind: "normal",
      next: i === 22 ? [13] : [i + 1],
      label: `Risk 1-${i - 19}`
    });
  }

  // 23-25: Risk Route 2 (rejoins at 18)
  for (let i = 23; i <= 25; i++) {
    board.push({
      id: `tile-${i}-risk2`,
      kind: "normal",
      next: i === 25 ? [18] : [i + 1],
      label: `Risk 2-${i - 22}`
    });
  }

  return board;
}

/**
 * Get rank name based on position
 */
export function getRankFromPosition(position: number): string {
  if (position <= 2) return "Analyst";
  if (position <= 8) return "Sr Analyst";
  if (position <= 14) return "Associate";
  if (position <= 16) return "Manager";
  if (position <= 17) return "Director";
  if (position === 18) return "Partner";
  return "Retired";
}
