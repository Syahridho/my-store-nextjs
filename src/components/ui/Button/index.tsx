type PropsTypes = {
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: string;
  className?: string;
};

const Button = (props: PropsTypes) => {
  const {
    type,
    onClick,
    children,
    variant = "bg-white text-blue-950 hover:bg-slate-100",
    className,
  } = props;
  return (
    <button
      type={type}
      className={`w-full my-2 py-1.5 rounded border border-blue-950 flex items-center justify-center transition duration-500 disabled:opacity-70 ${variant} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
