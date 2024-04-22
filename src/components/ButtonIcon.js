export default function ButtonIcon({ children, onClick, style }) {
  return (
    <button
      className={`${style} tw-flex tw-bg-transparent tw-border-none tw-transition-all tw-ease-in tw-duration-300 tw-cursor-pointer tw-text-3xl`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
