# 🧠 Brain Bolt: Adaptive Infinite Quiz Platform

A high-performance, real-time adaptive quiz engine built with **Next.js 15**, **TypeScript**, and **Tailwind CSS v4**. This platform demonstrates a robust implementation of difficulty scaling, streak-based scoring, and preventative logic for UI instability.

---

## 🚀 Key Engineering Features

### 1. Adaptive Difficulty Algorithm (Hysteresis-Based)
To solve the **ping-pong instability** (rapid oscillation between difficulty levels), this project implements a **Confidence-Hysteresis Model**:
- **Confidence Metric**: A hidden 0–100 scale tracks user performance.
- **Hysteresis Band**: Difficulty only shifts when confidence reaches the extreme bounds (0 or 100), ensuring a stable learning curve.
- **Punitive Adjustment**: Incorrect answers drop confidence by **50%**, while correct ones increase it by **25%**, ensuring the platform finds the user's "true floor" quickly.

### 2. Streak-Based Multiplier System
- **Streak Cap**: Multipliers are capped at **2.0x** (after a 5-question streak) to prevent runaway scoring while maintaining engagement.
- **Dynamic Calculation**: $Score = Base \times Difficulty \times (1 + \min(Streak, 5) \times 0.2)$.

### 3. Operational Rigor & Robustness
- **Idempotency**: Implemented a state-lock (`isProcessing`) to prevent double-submissions and duplicate scoring during asynchronous updates.
- **Real-Time Synchronization**: Global state managed via React Context for zero-lag updates between the quiz engine and live leaderboards.
- **Atomic Components**: Built with a "CSS-first" design system using Tailwind v4 theme tokens for maximum scalability.

---

## 🛠 Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4 (CSS-First Configuration)
- **State Management**: React Context API
- **Infrastructure**: Docker & Docker-Compose

---

## 🏃 Setup & Installation

### Option 1: Docker 
Ensure you are in the project root and run:
docker compose up --build
The app will be available at http://localhost:3000

### Option 2: Local Development
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

## 📖 Documentation Links
LLD.md: Detailed breakdown of module responsibilities, API schemas, and DB models.

EDGE_CASES.md: Comprehensive list of handled edge cases including boundary conditions and idempotency.