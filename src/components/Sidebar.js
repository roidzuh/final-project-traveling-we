import Link from "next/link";
import ButtonIcon from "./ButtonIcon";
import { FaRightLong, FaLeftLong } from "react-icons/fa6";
import { sidebarLink } from "@/utils/data";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { handleLogout } from "@/utils/api";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Sidebar() {
  const router = useRouter();
  const logout = async () => {
    try {
      const response = await handleLogout();
      // console.log(response);
      Cookies.remove("token");
      router.replace("/login");
    } catch (error) {
      console.error("Logout failed", error.message);
    }
  };

  return (
    <aside className="h-screen">
      <h1 className="text-2xl mt-2 font-bold cursor-default">Travelo</h1>
      <nav className="bg-slate-200 flex flex-col shadow-lg rounded-lg min-h-[85vh] relative top-6 transition-all ease-in hover:shadow-none">
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
          onClick={logout}
        >
          <HiArrowLeftOnRectangle className="text-xl transition-all ease-in" />
          <span className="text-lg">Logout</span>
        </ButtonIcon>
      </nav>
    </aside>
  );
}
