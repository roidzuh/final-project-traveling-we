import AdminLayout from "@/layout/AdminLayout";
import { useEffect, useState } from "react";
import { fetchCategory, deleteCategory } from "@/utils/api";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import Pagination from "@/components/Pagination";
import Link from "next/link";

export default function CategoryPage() {
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

  // Ubah halaman
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
                      <Button
                        title={"Delete"}
                        style="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDelete(category.id)}
                      />

                      <Link
                        href={`/dashboard/category/${category.id}`}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 no-underline"
                      >
                        Edit
                      </Link>
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
