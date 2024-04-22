import { useState, useEffect } from "react";
import ButtonIcon from "./ButtonIcon";
import { HiMiniUser } from "react-icons/hi2";
import { useRouter } from "next/router";

export default function User() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="tw-flex tw-gap-4 tw-items-center">
      <div>
        <img
          src={user?.profilePictureUrl}
          alt="avatar"
          className="tw-w-14 tw-h-14 tw-object-cover tw-rounded-full"
        />
      </div>
      <div>
        <h1 className="tw-text-xl tw-font-bold">{user?.name}</h1>
        <p className="tw-text-sm tw-text-gray-500">{user?.email}</p>
      </div>
      <ButtonIcon onClick={() => router.push("/dashboard/profile")}>
        <HiMiniUser className="tw-w-6 tw-h-6" />
      </ButtonIcon>
    </div>
  );
}
