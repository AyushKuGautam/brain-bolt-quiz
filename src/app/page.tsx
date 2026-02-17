"use client";
import { useState, useEffect } from "react";
import { useQuiz } from "@/context/QuizContext";
import { QuestionCard } from "@/components/QuestionCard";
import dynamic from "next/dynamic";

// Optimized Performance: Lazy loading the Leaderboard for CSR interactivity
const Leaderboard = dynamic(
  () => import("@/components/Leaderboard").then((mod) => mod.Leaderboard),
  {
    ssr: false,
    loading: () => (
      <div className="p-10 text-center text-gray-400 animate-pulse">
        Syncing Rankings...
      </div>
    ),
  },
);

export default function QuizHome() {
  // Integrated markAsAsked to track history and prevent repeats
  const { state, updateQuizState, markAsAsked } = useQuiz();
  const [question, setQuestion] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Functional Requirement: Idempotency state to avoid duplicate scoring
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchQuestion = async () => {
    setLoading(true);
    try {
      // Logic: Pass asked IDs as comma-separated string to the API
      const excludeList = state.askedQuestionIds.join(",");
      const res = await fetch(
        `/api/quiz/next?difficulty=${state.difficulty}&exclude=${excludeList}`,
      );
      const data = await res.json();

      setQuestion(data);
      // Operational Requirement: Register the new question immediately
      markAsAsked(data.id);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Adaptive Algorithm: Re-fetch whenever difficulty changes
  useEffect(() => {
    fetchQuestion();
  }, [state.difficulty]);

  const handleAnswer = async (choice: string) => {
    // Edge Case: Prevent duplicate answer submission
    if (!question || isProcessing) return;

    setIsProcessing(true); // Lock the state

    const isCorrect = choice === question.correctAnswer;
    updateQuizState(isCorrect);

    // Prepare UI for the next response
    setQuestion(null);
    await fetchQuestion();

    setIsProcessing(false); // Unlock state
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      {/* 1. Header Section: Adaptive Algorithm & Metrics Model */}
      <div className="mb-10 text-center space-y-2">
        <div className="text-5xl font-black text-brand-primary drop-shadow-sm">
          {state.score}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 text-lg font-bold">
          <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full">
            {state.streak}🔥 Streak
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
            Lvl {state.difficulty}
          </span>
          {/* Accuracy metric as per Problem Statement */}
          {state.accuracy > 0 && (
            <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
              {state.accuracy}% Accuracy
            </span>
          )}
        </div>

        {/* Hysteresis Band Visualization: Real-time confidence tracking */}
        <div className="mt-4 h-1.5 w-48 bg-gray-200 rounded-full mx-auto overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              state.confidence >= 75 ? "bg-green-500" : "bg-brand-primary"
            }`}
            style={{ width: `${state.confidence}%` }}
          />
        </div>
        {state.confidence >= 75 && (
          <p className="text-xs font-bold text-green-600 animate-pulse mt-1">
            PERFORMANCE PEAK: DIFFICULTY INCREASING ⚡
          </p>
        )}
        {state.confidence <= 25 && state.difficulty > 1 && (
          <p className="text-xs font-bold text-red-500 animate-pulse mt-1">
            STABILIZING DIFFICULTY...
          </p>
        )}
      </div>

      {/* 2. Quiz Section with Idempotency Lock */}
      <div className="w-full flex justify-center mb-12 min-h-[300px]">
        {loading || !question ? (
          <div className="flex items-center justify-center text-xl font-bold text-gray-400 animate-pulse">
            Loading next challenge...
          </div>
        ) : (
          <QuestionCard
            question={question}
            onAnswer={handleAnswer}
            disabled={isProcessing}
          />
        )}
      </div>

      <div className="mb-8 flex flex-col items-center gap-4">
        <button
          onClick={() => {
            if (confirm("End quiz and save score?")) window.location.reload();
          }}
          className="text-gray-400 hover:text-brand-danger font-bold text-sm transition-colors uppercase tracking-widest"
        >
          RESET SESSION
        </button>
      </div>

      {/* 3. Live Leaderboard: Updated immediately after each answer */}
      <div className="w-full max-w-xl">
        <Leaderboard />
      </div>
    </main>
  );
}
