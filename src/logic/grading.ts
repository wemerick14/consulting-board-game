/**
 * Grade a numeric answer based on relative error bands
 * Default bands: ≤5% → 4pts, ≤10% → 3pts, ≤20% → 2pts, ≤30% → 1pt, >30% → 0pts
 */
export function gradeNumeric(
  playerAnswer: number,
  truth: number,
  bands: number[] = [0.05, 0.10, 0.20, 0.30]
): number {
  // Handle edge cases
  if (truth === 0) {
    return playerAnswer === 0 ? 4 : 0;
  }

  const relativeError = Math.abs((playerAnswer - truth) / truth);

  // Award points based on accuracy bands
  if (relativeError <= bands[0]) return 4;
  if (relativeError <= bands[1]) return 3;
  if (relativeError <= bands[2]) return 2;
  if (relativeError <= bands[3]) return 1;
  return 0;
}

/**
 * Grade an MCQ answer based on pre-scored options
 */
export function gradeMcq(indexChosen: number, pointsByOption: number[]): number {
  if (indexChosen < 0 || indexChosen >= pointsByOption.length) {
    return 0;
  }
  return pointsByOption[indexChosen];
}

/**
 * Check if an answer is a severe miss (for setback penalties)
 */
export function isSevereMiss(
  playerAnswer: number,
  truth: number,
  rule?: string
): boolean {
  if (!rule || rule === "none") return false;

  if (rule === "opposite_sign") {
    // Check if player got the sign wrong
    return (playerAnswer >= 0 && truth < 0) || (playerAnswer < 0 && truth >= 0);
  }

  if (rule === "overshoot_x2") {
    // Check if player is off by more than 2x
    const ratio = Math.abs(playerAnswer / truth);
    return ratio > 2 || ratio < 0.5;
  }

  return false;
}
