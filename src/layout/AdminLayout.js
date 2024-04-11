import Sidebar from "@/components/Sidebar";
import User from "@/components/User";

export default function AdminLayout({ children, user }) {
  return (
    <div className="grid w-[96%] my-0 mx-auto gap-7 grid-cols-[12rem_auto_23rem]">
      <Sidebar />
      <main>{children}</main>
      <div className="flex justify-end gap-8 mt-4">
        {/* <User user={user} /> */}
      </div>
    </div>
  );
}
