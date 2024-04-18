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
    <aside className="h-full">
      <nav className="bg-slate-200 flex flex-col shadow-lg rounded-lg min-h-[87vh] relative top-6 transition-all ease-in hover:shadow-none">
        {sidebarLink.map((link) => (
          <Link
            href={link.href}
            key={link.title}
            className="no-underline text-gray-600 flex items-center h-14 gap-4 relative ml-8 transition-all ease-in hover:ml-12"
          >
            <link.icon className="text-xl transition-all ease-in" />
            {link.title}
          </Link>
        ))}
        <ButtonIcon
          style={
            "text-gray-600 items-center gap-4 ml-8 hover:ml-12 absolute bottom-10 w-full"
          }
          onClick={handleSubmitLogout}
        >
          {loading ? (
            <span className="text-lg">Logging out...</span>
          ) : (
            <>
              <HiArrowLeftOnRectangle className="text-xl transition-all ease-in" />
              <span className="text-lg">Logout</span>
            </>
          )}
        </ButtonIcon>
      </nav>
    </aside>
  );
}
