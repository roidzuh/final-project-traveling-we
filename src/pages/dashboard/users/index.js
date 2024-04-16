import { fetchAllUser, updateUserRole } from "@/utils/api";
import AdminLayout from "..";
import { useEffect, useState } from "react";
import Button from "@/components/Button";

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

  const handleRoleUpdate = async (userId, newRole) => {
    const token = localStorage.getItem("token");
    const response = await updateUserRole(userId, newRole, token);
    if (!response.error) {
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
      alert("Role berhasil diperbarui.");
    } else {
      alert("Gagal memperbarui role.");
    }
  };

  return (
    <AdminLayout>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-800">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Update Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr className="bg-gray-200" key={user.id}>
                <td className="border px-4 py-2 flex items-center gap-4">
                  {/* ada eror di reload image */}
                  {/* <img
                    src={user.profilePictureUrl}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  /> */}
                  <div>
                    <h5>{user.name}</h5>
                    <p>{user.email}</p>
                  </div>
                </td>
                <td className="border px-4 py-2">{user.phoneNumber}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2">
                  {user.role.toLowerCase() !== "admin" ? (
                    <Button
                      title={"Update to Admin"}
                      style={"bg-blue-500 text-white hover:bg-blue-700"}
                      onClick={() => handleRoleUpdate(user.id, "admin")}
                    />
                  ) : (
                    <Button
                      title={"Already Admin"}
                      style={"bg-gray-500 text-white cursor-not-allowed"}
                      disabled={true}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
