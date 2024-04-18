import AdminLayout from "@/layout/AdminLayout";
import { useEffect, useState } from "react";
import { fetchPromo, deletePromo } from "@/utils/api";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import Pagination from "@/components/Pagination";
import Link from "next/link";

export default function PromoPage() {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [promosPerPage] = useState(5);

  useEffect(() => {
    const getPromos = async () => {
      const dataPromo = await fetchPromo();
      setPromos(dataPromo?.data);
      setLoading(false);
    };
    getPromos();
  }, []);

  const handleDelete = async (promoId) => {
    const token = localStorage.getItem("token");
    const response = await deletePromo(promoId, token);
    if (!response.error) {
      setPromos(promos.filter((promo) => promo.id !== promoId));
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  const indexOfLastPromo = currentPage * promosPerPage;
  const indexOfFirstPromo = indexOfLastPromo - promosPerPage;
  const currentPromos = promos.slice(indexOfFirstPromo, indexOfLastPromo);

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
                href="/dashboard/promo/create"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded no-underline"
              >
                Create Promo
              </Link>
            </div>
            <table className="min-w-full border-collapse border border-gray-800">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-4 py-2">name</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentPromos.map((promo) => (
                  <tr className="bg-gray-200" key={promo.id}>
                    <td className="border px-4 py-2">{promo.title}</td>
                    <td className="border px-4 py-2">{promo.description}</td>
                    <td className="border px-4 py-2">
                      <img
                        src={promo.imageUrl}
                        alt={promo.title}
                        className="w-20 h-20"
                      />
                    </td>
                    <td className="border px-4 py-2 flex justify-around">
                      <Button
                        onClick={() => handleDelete(promo.id)}
                        title="Delete"
                        style={
                          "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        }
                      />
                      <Link
                        href={`/dashboard/promo/${promo.id}`}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded no-underline"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              pageSize={promosPerPage}
              itemsCount={promos.length}
              onPageChange={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
