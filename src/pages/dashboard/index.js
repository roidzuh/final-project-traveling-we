import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import AdminLayout from "@/layout/AdminLayout";
import { fetchUser } from "@/features/slices/userSlice";
import { isAuthenticated } from "@/utils/auth";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    } else {
      const token = localStorage.getItem("token");
      dispatch(fetchUser(token));
    }
  }, [dispatch, router]);

  return <AdminLayout></AdminLayout>;
}
