export const LOYALTY_CFA_PER_POINT = 1000;
export const LOYALTY_REWARD_POINTS = 10000;
export const LOYALTY_REWARD_CFA = 500;

export function pointsForAmount(amountCfa: number) {
  if (!Number.isFinite(amountCfa) || amountCfa <= 0) return 0;
  return Math.floor(amountCfa / LOYALTY_CFA_PER_POINT);
}

export function rewardAvailable(points: number) {
  return Number.isFinite(points) && points >= LOYALTY_REWARD_POINTS;
}

export function rewardCount(points: number) {
  if (!Number.isFinite(points) || points <= 0) return 0;
  return Math.floor(points / LOYALTY_REWARD_POINTS);
}
