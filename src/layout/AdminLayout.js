import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Spinners from "@/components/Spinners";
import { isAuthenticated } from "@/utils/auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const isFull = useSelector((state) => state.sidebar.isFull);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div>
        <Spinners />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>TravelGo</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={
          isFull
            ? "tw-grid tw-w-[96%] tw-my-0 tw-mx-auto tw-gap-7 tw-grid-cols-[4rem_auto] tw-grid-rows-[1rem_auto] tw-transition-all tw-ease-in"
            : "tw-grid tw-w-[96%] tw-my-0 tw-mx-auto tw-gap-7 tw-grid-cols-[auto] tw-grid-rows-[1rem_auto] tw-transition-all tw-ease-in"
        }
      >
        <Header />
        {isFull ? <Sidebar /> : null}
        <main className="tw-mt-7 tw-overflow-auto tw-h-[calc(100vh-6rem)] tw-min-h-[365px]">
          {children}
        </main>
      </div>
    </>
  );
}
