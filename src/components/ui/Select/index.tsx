type Options = {
  label: string;
  value: string;
  selected?: boolean;
};

type PropsTypes = {
  label?: string;
  name: string;
  defaultValue?: string;
  disabled?: boolean;
  options: Options[] | any;
};

const Select = (props: PropsTypes) => {
  const { label, name, defaultValue, disabled, options } = props;
  return (
    <div className="flex flex-col mb-2">
      <label htmlFor={name} className="font-medium">
        {label}
      </label>
      <select
        name={name}
        id={name}
        className="border rounded mt-1 px-2 py-1.5 bg-slate-50"
        defaultValue={defaultValue}
        disabled={disabled}
      >
        {options?.map((option: Options) => (
          <option
            value={option.value}
            key={option.label}
            selected={option.selected}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
