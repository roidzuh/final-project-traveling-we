import AdminLayout from "@/layout/AdminLayout";
import { useEffect, useState } from "react";
import { fetchBanners, deleteBanner } from "@/utils/api";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import Pagination from "@/components/Pagination";
import Link from "next/link";

export default function BannerPage() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [bannersPerPage] = useState(5);

  useEffect(() => {
    const getBanners = async () => {
      const dataBanner = await fetchBanners();
      setBanners(dataBanner?.data);
      setLoading(false);
    };
    getBanners();
  }, []);

  const handleDelete = async (bannerId) => {
    const token = localStorage.getItem("token");
    const response = await deleteBanner(bannerId, token);
    if (!response.error) {
      setBanners(banners.filter((banner) => banner.id !== bannerId));
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  const indexOfLastBanner = currentPage * bannersPerPage;
  const indexOfFirstBanner = indexOfLastBanner - bannersPerPage;
  const currentBanners = banners.slice(indexOfFirstBanner, indexOfLastBanner);

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
                href="/dashboard/banner/create"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded no-underline"
              >
                Create Banner
              </Link>
            </div>
            <table className="min-w-full border-collapse border border-gray-800">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-4 py-2">id</th>
                  <th className="px-4 py-2">name</th>
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentBanners.map((banner) => (
                  <tr className="bg-gray-200" key={banner.id}>
                    <td className="border px-4 py-2">{banner.id}</td>
                    <td className="border px-4 py-2">{banner.name}</td>
                    <td className="border px-4 py-2">
                      <img
                        src={banner.imageUrl}
                        alt={banner.name}
                        className="w-20 h-20 object-cover"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <Button
                        title={"Delete"}
                        style="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDelete(banner.id)}
                      />

                      <Link
                        href={`/dashboard/banner/${banner.id}`}
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
              itemsCount={banners.length}
              pageSize={bannersPerPage}
              currentPage={currentPage}
              onPageChange={paginate}
            />
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
