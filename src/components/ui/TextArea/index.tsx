type PropsTypes = {
  label?: string;
  name: string;
  placeholder?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  className?: string;
  onChange?: (e: any) => void;
};

const TextArea = (props: PropsTypes) => {
  const {
    label,
    name,
    placeholder,
    defaultValue,
    disabled,
    className,
    onChange,
  } = props;
  return (
    <div className="flex flex-col mb-2">
      {label && (
        <label htmlFor={name} className="font-medium">
          {label}
        </label>
      )}
      <textarea
        name={name}
        id={name}
        className={`border rounded mt-1 px-2 py-1.5 bg-slate-50 ${className}`}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
};

export default TextArea;
