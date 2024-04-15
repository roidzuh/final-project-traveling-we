import React from "react";
import { useSelector } from "react-redux";

export default function User() {
  const user = useSelector((state) => state.user.data);

  return (
    <div className="flex gap-4 items-center">
      <div>
        <h1 className="text-xl font-bold">{user?.name}</h1>
        <p className="text-sm text-gray-500">{user?.email}</p>
      </div>
      <div>
        <img
          src={user?.profilePictureUrl}
          alt="avatar"
          className="w-14 h-14 rounded-full"
        />
      </div>
    </div>
  );
}
