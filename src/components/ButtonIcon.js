export default function ButtonIcon({ children, onClick, style }) {
  return (
    <button
      className={`${style} flex bg-transparent  border-none transition-all ease-in duration-300 cursor-pointer text-3xl`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
