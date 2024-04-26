import { fetchAllUser, updateUserRole } from "@/utils/api";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import AdminLayout from "@/layout/AdminLayout";
import Pagination from "@/components/Pagination";
import Spinners from "@/components/Spinners";
import { IoIosMail } from "react-icons/io";
import { FaPhoneAlt, FaUserCog } from "react-icons/fa";

export default function UsersPageDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(8);

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
        <Spinners />
      ) : (
        <div className="tw-container tw-mx-auto tw-mt-5 tw-pb-8">
          <h2 className="tw-text-gray-500 tw-font-bold tw-text-lg md:tw-text-xl">
            User List
          </h2>
          <div className="tw-flex tw-flex-wrap ">
            {currentUsers?.map((user) => (
              <div
                className="tw-w-full sm:tw-w-1/2 md:tw-w-1/3 lg:tw-w-1/4 tw-px-4 tw-mb-4"
                key={user.id}
              >
                <div className="tw-bg-gray-100 tw-shadow-lg tw-rounded-lg tw-overflow-hidden tw-transition-all tw-duration-3000 hover:tw-shadow-none hover:tw-transition-all hover:tw-duration-300">
                  <div className="tw-p-2 tw-flex tw-flex-col tw-items-center">
                    <img
                      src={user.profilePictureUrl}
                      onError={(e) =>
                        (e.target.src = "https://placehold.co/600x400")
                      }
                      alt="Profile"
                      className="tw-w-20 tw-h-20 md:tw-w-24 md:tw-h-24 tw-rounded-full tw-mb-4"
                    />
                    <h5 className="tw-text-gray-900 tw-font-bold tw-text-base md:tw-text-xl">
                      {user.name}
                    </h5>
                  </div>
                  <div className="tw-px-4 tw-border-t tw-border-gray-200">
                    <p className="tw-text-gray-600 tw-text-sm md:tw-text-base">
                      <IoIosMail className="tw-text-gray-600 tw-mr-2 tw-text-lg md:tw-text-xl" />
                      : {user.email}
                    </p>
                    <p className="tw-text-gray-600 tw-text-sm md:tw-text-base">
                      <FaPhoneAlt className="tw-text-gray-600 tw-mr-2 tw-text-lg md:tw-text-xl" />
                      : {user.phoneNumber}
                    </p>
                    <p className="tw-text-gray-600 tw-text-sm md:tw-text-base">
                      <FaUserCog className="tw-text-gray-600 tw-mr-2 tw-text-lg md:tw-text-xl" />
                      : {user.role}
                    </p>
                  </div>
                  <div className="tw-p-4 tw-border-t tw-border-gray-200 tw-text-right">
                    {user.role.toLowerCase() !== "admin" ? (
                      <Button
                        title={"Update to Admin"}
                        style={
                          "tw-bg-blue-500 tw-text-white hover:tw-bg-blue-600"
                        }
                        onClick={() => handleRoleUpdate(user.id, "admin")}
                      />
                    ) : (
                      <Button
                        title={"Already Admin"}
                        style={
                          "tw-bg-gray-400 tw-text-white tw-cursor-not-allowed"
                        }
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
