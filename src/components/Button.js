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
      className={`tw-px-4 tw-py-2 tw-rounded-md tw-border-none tw-transition-all tw-ease-in tw-duration-300 tw-cursor-pointer ${style}`}
      onClick={onClick}
      disabled={isLoading}
    >
      {title}
    </button>
  );
}
