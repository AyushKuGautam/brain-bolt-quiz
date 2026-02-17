"use client";
import { useState, useMemo } from "react";
import { useQuiz } from "@/context/QuizContext";

// 1. Define the structure for a Leaderboard User
interface LeaderboardEntry {
  username: string;
  score: number;
  streak: number;
  isCurrent: boolean; // Now every user MUST have this property
}

export const Leaderboard = () => {
  const { state } = useQuiz();

  // 2. Initialize mock users with isCurrent set to false
  const [mockUsers] = useState<LeaderboardEntry[]>([
    { username: "Priya_MNNIT", score: 850, streak: 8, isCurrent: false },
    { username: "Rahul_ECE", score: 620, streak: 5, isCurrent: false },
    { username: "Tech_Guru", score: 410, streak: 4, isCurrent: false },
  ]);

  // 3. Merge and Sort logic
  const rankings = useMemo(() => {
    const currentUser: LeaderboardEntry = {
      username: "You (Ayush)",
      score: state.score,
      streak: state.streak,
      isCurrent: true,
    };

    // Combine and sort descending by score
    return [...mockUsers, currentUser].sort((a, b) => b.score - a.score);
  }, [state.score, state.streak, mockUsers]);

  return (
    <div className="w-full max-w-xl p-6 bg-white rounded-quiz shadow-xl border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-black text-brand-primary uppercase tracking-tight">
          Live Global Rankings
        </h3>
        <span className="text-xs font-bold text-gray-400">
          UPDATES REAL-TIME
        </span>
      </div>

      <div className="space-y-3">
        {rankings.map((user, i) => (
          <div
            key={user.username}
            className={`flex justify-between items-center p-4 rounded-lg transition-all duration-500 ${
              user.isCurrent
                ? "bg-brand-primary text-white scale-105 shadow-md ring-2 ring-blue-300"
                : "bg-gray-50 text-gray-700"
            }`}
          >
            <div className="flex items-center gap-4">
              <span
                className={`font-black ${user.isCurrent ? "text-white" : "text-gray-400"}`}
              >
                #{i + 1}
              </span>
              <span className="font-bold">{user.username}</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-xs uppercase font-black opacity-60 leading-none">
                  Score
                </p>
                <p className="font-black text-lg">{user.score}</p>
              </div>
              <div className="text-right border-l pl-4 border-current border-opacity-20">
                <p className="text-xs uppercase font-black opacity-60 leading-none">
                  Streak
                </p>
                <p className="font-black text-lg">{user.streak}🔥</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
