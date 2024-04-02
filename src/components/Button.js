export default function Button({ title, onClick, style, type = "button" }) {
  return (
    <button
      type={type}
      className={`${style} px-4 py-2 rounded-md border-none transition-all ease-in duration-300 cursor-pointer`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
