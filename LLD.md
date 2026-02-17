# Low-Level Design: Adaptive Quiz Platform

## 1. Class/Module Responsibilities
- **AdaptiveEngine (Lib):** Pure function to calculate difficulty/confidence using Hysteresis.
- **QuizProvider (Context):** Manages global score, streak, and difficulty state.
- **QuestionAPI (Route):** Filters and serves questions based on difficulty level.

## 2. API Schema
- `GET /v1/quiz/next?difficulty=N`: Returns `{ id, prompt, choices, difficulty }`.
- `GET /v1/leaderboard`: Returns `Array<{ username, score, streak }>`.

## 3. DB Schema (Proposed)
- **Users:** `id (PK), username, total_score, max_streak`
- **Questions:** `id (PK), difficulty (indexed), prompt, choices, correct_answer`
- **Logs:** `id, user_id, question_id, is_correct, answered_at`

## 4. Edge Case Handling
- **Ping-Pong:** Solved via "Confidence Score" (Hysteresis Band). Level changes require 4 correct or 2 wrong answers.
- **Boundary:** Difficulty clamped between 1 and 10 in the logic.
- **Idempotency:** Prevented via `lastAnsweredId` tracking in UI and `stateVersion` in API.