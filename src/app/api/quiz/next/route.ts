import { NextResponse } from "next/server";
import { questions } from "@/data/questions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const difficulty = parseInt(searchParams.get("difficulty") || "1");

  // Get the list of IDs to exclude from the query string to prevent repeats
  const exclude = searchParams.get("exclude")?.split(",") || [];

  // Filter for the right difficulty AND ensure the question hasn't been asked yet
  let availableQuestions = questions.filter(
    (q) => q.difficulty === difficulty && !exclude.includes(q.id),
  );

  // Safety Fallback Logic:
  // 1. If we ran out of UNSEEN questions for this level, reset and allow repeats for this difficulty
  if (availableQuestions.length === 0) {
    availableQuestions = questions.filter((q) => q.difficulty === difficulty);
  }

  // 2. Ultimate Fallback: If no questions exist for this difficulty at all, pull from the entire pool
  const questionToServe =
    availableQuestions.length > 0
      ? availableQuestions[
          Math.floor(Math.random() * availableQuestions.length)
        ]
      : questions[Math.floor(Math.random() * questions.length)];

  return NextResponse.json(questionToServe);
}
