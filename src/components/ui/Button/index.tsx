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
    variant = "bg-slate-800 text-white hover:bg-slate-950",
    className,
  } = props;
  return (
    <button
      type={type}
      className={`my-2 p-2 text-base rounded border border-blue-950 flex items-center justify-center transition duration-500 disabled:opacity-70 ${variant} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
