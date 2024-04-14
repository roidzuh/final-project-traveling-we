import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function AdminLayout({ children, user }) {
  return (
    <div className="grid w-[96%] my-0 mx-auto gap-7 grid-cols-[12rem_auto] grid-rows-[1rem_auto]">
      <Header />
      <Sidebar />
      <main>{children}</main>
      <div className="flex justify-end gap-8 mt-4"></div>
    </div>
  );
}
