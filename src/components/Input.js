export default function Input({
  type,
  name,
  placeholder,
  value,
  style,
  onChange,
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${style} tw-p-2 tw-rounded-xl tw-border`}
    />
  );
}
