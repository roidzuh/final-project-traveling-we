import React from "react";
import { useSelector } from "react-redux";

export default function User() {
  const user = useSelector((state) => state.user.data);

  return (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
}
