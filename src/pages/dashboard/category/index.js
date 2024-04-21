import AdminLayout from "@/layout/AdminLayout";
import { useEffect, useState } from "react";
import { fetchCategory, deleteCategory } from "@/utils/api";
import { toast } from "react-toastify";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import ButtonIcon from "@/components/ButtonIcon";

export default function CategoryPageDashboard() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(5);

  useEffect(() => {
    const getCategories = async () => {
      const dataCategory = await fetchCategory();
      setCategories(dataCategory?.data);
      setLoading(false);
    };
    getCategories();
  }, []);

  const handleDelete = async (categoryId) => {
    const token = localStorage.getItem("token");
    const response = await deleteCategory(categoryId, token);
    if (!response.error) {
      setCategories(
        categories.filter((category) => category.id !== categoryId)
      );
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <AdminLayout>
      {loading ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <div className="container mx-auto ">
          <div className="overflow-x-auto">
            <div className="flex justify-between mb-4">
              <Link
                href="/dashboard/category/create"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded no-underline"
              >
                Create Category
              </Link>
            </div>
            <table className="min-w-full border-collapse border border-gray-800">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentCategories.map((category) => (
                  <tr className="bg-gray-200" key={category.id}>
                    <td className="border px-4 py-2">{category.id}</td>
                    <td className="border px-4 py-2">{category.name}</td>
                    <td className="border px-4 py-2">
                      <img
                        src={category.imageUrl}
                        alt={category.name}
                        className="w-20 h-20"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <div className="flex items-center justify-center gap-4">
                        <ButtonIcon
                          style="text-black font-bold"
                          onClick={() => handleDelete(category.id)}
                        >
                          <HiOutlineTrash />
                        </ButtonIcon>
                        <Link
                          href={`/dashboard/category/${category.id}`}
                          className="text-3xl text-black font-bold no-underline"
                        >
                          <HiOutlinePencil />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              itemsCount={categories.length}
              pageSize={categoriesPerPage}
              currentPage={currentPage}
              onPageChange={paginate}
            />
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
