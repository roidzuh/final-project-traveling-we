import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { isAuthenticated } from "@/utils/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AdminLayout({ children, user }) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="grid w-full lg:w-[96%] my-0 mx-auto gap-7 grid-cols-[12rem_auto] grid-rows-[1rem_auto]">
      <Header />
      <Sidebar />
      <main className="mt-7 overflow-auto h-[calc(100vh-6rem)] ">
        {children}
      </main>
    </div>
  );
}
