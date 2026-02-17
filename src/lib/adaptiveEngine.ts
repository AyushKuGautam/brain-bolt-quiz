export const calculateNextState = (
  currentDifficulty: number,
  currentConfidence: number,
  isCorrect: boolean,
  currentStreak: number,
) => {
  let nextDifficulty = currentDifficulty;
  let nextConfidence = currentConfidence;
  let nextStreak = isCorrect ? currentStreak + 1 : 0;

  if (isCorrect) {
    nextConfidence += 25; // Level up takes 4 correct answers
  } else {
    nextConfidence -= 50; // Level down takes only 2 wrong answers (punitive)
  }

  // Difficulty Adjustment Logic (Hysteresis Band)
  if (nextConfidence >= 100 && nextDifficulty < 10) {
    nextDifficulty++;
    nextConfidence = 50; // Reset to middle of the new level
  } else if (nextConfidence <= 0 && nextDifficulty > 1) {
    nextDifficulty--;
    nextConfidence = 50;
  }

  return { nextDifficulty, nextConfidence, nextStreak };
};
