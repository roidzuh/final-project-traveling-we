export default function ButtonIcon({ children, onClick, style, disabled }) {
  return (
    <button
      className={`tw-flex tw-bg-transparent tw-border-none tw-transition-all tw-ease-in tw-duration-300 tw-cursor-pointer tw-text-3xl ${style}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
