import Link from "next/link";
import ButtonIcon from "./ButtonIcon";
import { sidebarLink } from "@/utils/data";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { handleLogout } from "@/utils/api";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Sidebar() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmitLogout = async () => {
    setLoading(true);
    const response = await handleLogout();
    if (!response.error) {
      router.replace("/login");
    } else {
      toast.error(response.message);
    }
    setLoading(false);
  };

  return (
    <aside className="tw-h-full">
      <nav className="tw-bg-slate-200 tw-flex tw-flex-col tw-shadow-lg tw-rounded-lg tw-min-h-[365px] tw-h-[87vh] tw-relative tw-top-6 tw-transition-all tw-ease-in hover:tw-shadow-none">
        {sidebarLink.map((link) => (
          <Link
            href={link.href}
            key={link.title}
            className="tw-no-underline tw-text-gray-600 tw-flex tw-items-center tw-h-14 tw-gap-4 tw-relative tw-ml-8 tw-transition-all tw-ease-in hover:tw-ml-12"
          >
            <link.icon className="tw-text-xl tw-transition-all tw-ease-in" />
            {link.title}
          </Link>
        ))}
        <ButtonIcon
          style={
            "tw-text-gray-600 tw-items-center tw-gap-4 tw-ml-8 hover:tw-ml-12 tw-absolute tw-bottom-10 tw-w-full"
          }
          onClick={handleSubmitLogout}
        >
          {loading ? (
            <>
              <HiArrowLeftOnRectangle className="tw-text-xl tw-transition-all tw-ease-in" />
              <span className="tw-text-lg">Logout...</span>
            </>
          ) : (
            <>
              <HiArrowLeftOnRectangle className="tw-text-xl tw-transition-all tw-ease-in" />
              <span className="tw-text-lg">Logout</span>
            </>
          )}
        </ButtonIcon>
      </nav>
    </aside>
  );
}
