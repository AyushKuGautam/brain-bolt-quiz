# Edge Case Handling Documentation

1. **Ping-Pong Instability**: Addressed via a 100-point Confidence Score (Hysteresis). Difficulty only changes at bounds (0 or 100).
2. **Idempotency**: Prevented double-scoring via an `isProcessing` state lock in the frontend and a `lastAnsweredId` check.
3. **Boundary Conditions**: Difficulty is strictly clamped between Level 1 (floor) and Level 10 (ceiling) in the `AdaptiveEngine`.
4. **Data Exhaustion**: If the question pool for a specific difficulty is empty, the API falls back to a random question from the general pool to prevent a 404/Crash.
5. **Inactivity**: In a production Redis setup, user sessions would have a TTL (Time-to-Live); if the user returns after expiry, the streak is reset to zero.
6. **Metric model edge case**: If the user reloads the browser, the current state is stored in localStorage to prevent score loss (Note: we implemented this via React State for the demo, but production would use persistence).

7. **Streak Decay**: If a user submits an answer twice (idempotency), the second submission is ignored and the streak is not incremented or reset.