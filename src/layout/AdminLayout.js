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
    <div className="tw-grid tw-w-[96%] tw-my-0 tw-mx-auto tw-gap-7 tw-grid-cols-[12rem_auto] tw-grid-rows-[1rem_auto]">
      <Header />
      <Sidebar />
      <main className="tw-mt-7 tw-overflow-auto tw-h-[calc(100vh-6rem)]">
        {children}
      </main>
    </div>
  );
}
