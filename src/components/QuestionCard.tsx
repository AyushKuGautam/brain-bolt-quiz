import { Button } from "./ui/Button";

export const QuestionCard = ({ question, onAnswer, disabled }: any) => {
  if (!question) return null;

  return (
    <div className="w-full max-w-xl p-8 bg-white border border-gray-200 rounded-quiz shadow-xl">
      <div className="mb-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
        Difficulty Level {question.difficulty}
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        {question.prompt}
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {question.choices.map((choice: string) => (
          <Button
            key={choice}
            onClick={() => onAnswer(choice)}
            disabled={disabled}
            className="bg-white !text-brand-primary border-2 border-brand-primary hover:bg-brand-primary hover:!text-white"
          >
            {choice}
          </Button>
        ))}
      </div>
    </div>
  );
};
