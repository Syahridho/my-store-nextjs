type PropsTypes = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
};

const Input = (props: PropsTypes) => {
  const { label, name, type, placeholder } = props;
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
      />
    </div>
  );
};

export default Input;
