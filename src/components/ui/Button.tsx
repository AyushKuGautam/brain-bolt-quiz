interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export const Button = ({
  children,
  onClick,
  disabled,
  className,
}: ButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-6 py-3 bg-brand-primary text-white font-bold rounded-quiz hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 ${className}`}
  >
    {children}
  </button>
);
