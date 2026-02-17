"use client";
import React, { createContext, useContext, useState } from "react";

const QuizContext = createContext<any>(null);

export const QuizProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState({
    score: 0,
    streak: 0,
    maxStreak: 0,
    difficulty: 1,
    confidence: 50, // 0-100 scale to prevent ping-ponging
    totalQuestions: 0,
    correctAnswers: 0,
    accuracy: 0,
    askedQuestionIds: [] as string[], // Step 1: Track history to prevent repeats
  });

  // Step 2: Function to register a question as "asked"
  const markAsAsked = (id: string) => {
    setState((prev) => ({
      ...prev,
      askedQuestionIds: [...prev.askedQuestionIds, id],
    }));
  };

  const updateQuizState = (isCorrect: boolean) => {
    setState((prev) => {
      const newTotal = prev.totalQuestions + 1;
      const newCorrect = isCorrect
        ? prev.correctAnswers + 1
        : prev.correctAnswers;
      const accuracy = Math.round((newCorrect / newTotal) * 100);
      const newStreak = isCorrect ? prev.streak + 1 : 0;

      // Multiplier logic: 1.0x (0 streak) up to 2.0x (5+ streak)
      const multiplier = 1 + Math.min(newStreak, 5) * 0.2;
      const scoreDelta = isCorrect
        ? Math.round(10 * prev.difficulty * multiplier)
        : 0;

      let nextDifficulty = prev.difficulty;
      let nextConfidence = isCorrect
        ? prev.confidence + 25
        : prev.confidence - 50;

      // Hysteresis: only change level when confidence hits bounds (0 or 100)
      if (nextConfidence >= 100 && nextDifficulty < 10) {
        nextDifficulty++;
        nextConfidence = 50;
      } else if (nextConfidence <= 0 && nextDifficulty > 1) {
        nextDifficulty--;
        nextConfidence = 50;
      }

      return {
        ...prev,
        totalQuestions: newTotal,
        correctAnswers: newCorrect,
        accuracy: accuracy,
        score: prev.score + scoreDelta,
        streak: newStreak,
        maxStreak: Math.max(prev.maxStreak, newStreak),
        difficulty: nextDifficulty,
        confidence: nextConfidence,
      };
    });
  };

  return (
    // Step 3: Include markAsAsked in the Provider value
    <QuizContext.Provider value={{ state, updateQuizState, markAsAsked }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
