import { useEffect, useState } from "react";
import { fetchUser } from "@/utils/api";
import ButtonIcon from "./ButtonIcon";
import { HiMiniUser } from "react-icons/hi2";
import { useRouter } from "next/router";

export default function User() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getUser = async () => {
      const fetchedUser = await fetchUser(token);
      setUser(fetchedUser?.data);
    };
    getUser();
  }, []);

  return (
    <div className="flex gap-4 items-center">
      <div>
        <img
          src={user?.profilePictureUrl}
          alt="avatar"
          className="w-14 h-14 rounded-full"
        />
      </div>
      <div>
        <h1 className="text-xl font-bold">{user?.name}</h1>
        <p className="text-sm text-gray-500">{user?.email}</p>
      </div>
      <ButtonIcon onClick={() => router.push("/dashboard/profile")}>
        <HiMiniUser className="w-6 h-6" />
      </ButtonIcon>
    </div>
  );
}
