import Link from "next/link";
import ButtonIcon from "./ButtonIcon";
import { sidebarLink } from "@/utils/data";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { handleLogout } from "@/utils/api";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Spinners from "./Spinners";

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

  const handleMouseEnter = (e) => {
    e.currentTarget.nextSibling.style.display = "block";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.nextSibling.style.display = "none";
  };

  return (
    <aside className="tw-h-full tw-z-10">
      <nav className="tw-bg-slate-200 tw-flex tw-flex-col tw-shadow-lg tw-rounded-lg tw-min-h-[365px] tw-h-[87vh] tw-relative tw-top-6 tw-transition-all tw-ease-in hover:tw-shadow-none">
        {sidebarLink.map((link) => (
          <Link
            href={link.href}
            key={link.title}
            className={`${
              router.pathname.startsWith(link.href)
                ? "tw-no-underline tw-text-gray-600 tw-flex tw-items-center tw-h-14 tw-gap-4 tw-relative tw-mx-auto tw-transition-all tw-ease-in tw-bg-slate-400 tw-px-4 tw-rounded-lg tw-mt-1"
                : "tw-no-underline tw-text-gray-600 tw-flex tw-items-center tw-h-14 tw-gap-4 tw-relative tw-mx-auto tw-transition-all tw-ease-in hover:tw-bg-slate-400 hover:tw-px-4 hover:tw-rounded-lg tw-mt-1"
            }`}
          >
            <link.icon
              className="tw-text-xl tw-transition-all tw-ease-in 
                hover:tw-relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            <span
              className="tw-absolute tw-hidden tw-left-16 
              tw-text-md tw-font-semibold tw-bg-slate-200 tw-px-4 
              tw-py-2 tw-rounded-md"
            >
              {link.title}
            </span>
          </Link>
        ))}
        <div className="tw-flex tw-justify-center">
          <ButtonIcon
            style={
              "tw-no-underline tw-text-gray-600 tw-flex tw-items-center tw-h-14 tw-gap-4 tw-absolute tw-transition-all tw-ease-in hover:tw-bg-slate-400 hover:tw-px-4 tw-bottom-[1vh] hover:tw-rounded-lg"
            }
            onClick={handleSubmitLogout}
            disabled={loading}
          >
            {loading ? (
              <Spinners />
            ) : (
              <>
                <HiArrowLeftOnRectangle
                  className="tw-text-xl tw-transition-all tw-ease-in"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
                <span
                  className="tw-absolute tw-hidden tw-left-16 
                  tw-text-md tw-font-semibold tw-bg-slate-200 tw-px-4 
                  tw-py-2 tw-rounded-md tw-text-base"
                >
                  Logout
                </span>
              </>
            )}
          </ButtonIcon>
        </div>
      </nav>
    </aside>
  );
}
