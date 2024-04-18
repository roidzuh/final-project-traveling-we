import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { isAuthenticated } from "@/utils/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AdminLayout({ children, user }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid w-[96%] my-0 mx-auto gap-7 grid-cols-[12rem_auto] grid-rows-[1rem_auto]">
      <Header />
      <Sidebar />
      <main className="mt-7 overflow-auto h-[calc(100vh-6rem)]">
        {children}
      </main>
    </div>
  );
}
