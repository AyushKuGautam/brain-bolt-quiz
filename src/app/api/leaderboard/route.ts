import { NextResponse } from "next/server";

export async function GET() {
  const topScores = [
    { username: "Ayush", score: 1250, streak: 12 },
    { username: "Player2", score: 980, streak: 8 },
    { username: "User88", score: 450, streak: 5 },
  ];
  return NextResponse.json(topScores);
}
