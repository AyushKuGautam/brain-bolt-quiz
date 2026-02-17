import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import "./globals.css";
import { QuizProvider } from "@/context/QuizContext";

export const metadata: Metadata = {
  title: "Adaptive Quiz Platform",
  description: "Built for speed",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QuizProvider>{children}</QuizProvider>
      </body>
    </html>
  );
}
