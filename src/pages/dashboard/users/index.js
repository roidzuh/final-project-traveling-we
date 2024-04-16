import { fetchAllUser } from "@/utils/api";
import AdminLayout from "..";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getUsers = async () => {
      const fetchedUsers = await fetchAllUser(token);
      setUsers(fetchedUsers?.data);
    };
    getUsers();
  }, []);

  return <AdminLayout></AdminLayout>;
}
