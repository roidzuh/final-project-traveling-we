export default function ButtonIcon({ children, onClick }) {
  return (
    <button
      className={` flex bg-transparent  border-none transition-all ease-in duration-300 cursor-pointer text-3xl`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
