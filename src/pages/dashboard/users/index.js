import { fetchAllUser, updateUserRole } from "@/utils/api";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import AdminLayout from "@/layout/AdminLayout";
import Pagination from "@/components/Pagination";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getUsers = async () => {
      const fetchedUsers = await fetchAllUser(token);
      setUsers(fetchedUsers?.data);
      setLoading(false);
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
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users?.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <AdminLayout>
      {loading ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <div className="container mx-auto mt-5">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-800">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Phone Number</th>
                  <th className="px-4 py-2">Role</th>
                  <th className="px-4 py-2">Update Role</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers?.map((user) => (
                  <tr className="bg-gray-200" key={user.id}>
                    <td className="border px-4 py-2 flex items-center gap-4">
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
            <Pagination
              itemsCount={users?.length}
              pageSize={usersPerPage}
              currentPage={currentPage}
              onPageChange={paginate}
            />
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
