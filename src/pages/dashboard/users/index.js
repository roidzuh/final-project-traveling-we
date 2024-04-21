import { fetchAllUser, updateUserRole } from "@/utils/api";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import AdminLayout from "@/layout/AdminLayout";
import Pagination from "@/components/Pagination";

export default function UsersPageDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(12);

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
          <div className="flex flex-wrap -mx-4">
            {currentUsers?.map((user) => (
              <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4" key={user.id}>
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="p-4 flex flex-col items-center">
                    <img
                      src={user.profilePictureUrl}
                      alt="Profile"
                      className="w-24 h-24 rounded-full mb-4"
                    />
                    <h5 className="text-gray-900 font-bold text-xl">
                      {user.name}
                    </h5>
                    <p className="text-gray-700">{user.email}</p>
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <p className="text-gray-600">Phone: {user.phoneNumber}</p>
                    <p className="text-gray-600">Role: {user.role}</p>
                  </div>
                  <div className="p-4 border-t border-gray-200 text-right">
                    {user.role.toLowerCase() !== "admin" ? (
                      <Button
                        title={"Update to Admin"}
                        style={"bg-blue-500 text-white hover:bg-blue-600"}
                        onClick={() => handleRoleUpdate(user.id, "admin")}
                      />
                    ) : (
                      <Button
                        title={"Already Admin"}
                        style={"bg-gray-400 text-white cursor-not-allowed"}
                        disabled={true}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            itemsCount={users?.length}
            pageSize={usersPerPage}
            currentPage={currentPage}
            onPageChange={paginate}
          />
        </div>
      )}
    </AdminLayout>
  );
}
