import Link from "next/link";

export default function ButtonLink({ title, href }) {
  return (
    <Link
      href={href}
      className="tw-no-underline tw-bg-blue-500 tw-text-white hover:tw-bg-blue-600 tw-px-4 tw-py-2 tw-rounded-md tw-border-none tw-cursor-pointer tw-transition-all tw-ease-in tw-duration-300"
    >
      {title}
    </Link>
  );
}
