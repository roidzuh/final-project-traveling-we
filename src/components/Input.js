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
      className={`${style} p-2 rounded-xl border`}
    />
  );
}
