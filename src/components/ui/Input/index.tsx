type PropsTypes = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
};

const Input = (props: PropsTypes) => {
  const { label, name, type, placeholder, defaultValue, disabled } = props;
  return (
    <div className="flex flex-col mb-2">
      {label && (
        <label htmlFor={name} className="font-medium">
          {label}
        </label>
      )}
      <input
        name={name}
        id={name}
        type={type}
        className="border rounded mt-1 px-2 py-1.5 bg-slate-50"
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
