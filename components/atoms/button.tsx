interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
}

export function Button({
  children,
  onClick,
  type = "button",
  variant = "primary"
}: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded-md font-medium transition-colors cursor-pointer";
  const variantStyles = variant === "primary"
    ? "bg-blue-600 text-white hover:bg-blue-700"
    : "bg-gray-200 text-gray-800 hover:bg-gray-300";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles}`}
    >
      {children}
    </button>
  );
}
