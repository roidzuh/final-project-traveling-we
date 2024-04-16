export default function Button({
  title,
  onClick,
  style,
  type = "button",
  isLoading,
}) {
  return (
    <button
      type={type}
      className={` px-4 py-2 rounded-md border-none transition-all ease-in duration-300 cursor-pointer ${style}`}
      onClick={onClick}
      disabled={isLoading}
    >
      {title}
    </button>
  );
}
