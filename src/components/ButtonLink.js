import Link from "next/link";

export default function ButtonLink({ title, href }) {
  return (
    <Link
      href={href}
      className="no-underline bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md border-none cursor-pointer transition-all ease-in duration-300"
    >
      {title}
    </Link>
  );
}
