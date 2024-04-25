import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchCategoryById } from "@/utils/api";
import Spinners from "@/components/Spinners";
import AdminLayout from "@/layout/AdminLayout";

export default function DashboardCategoryDetail() {
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetchCategoryById(id).then((data) => {
        setCategory(data.data);
        setIsLoading(false);
      });
    }
  }, [id]);

  return (
    <AdminLayout>
      <div className="tw-container tw-mx-auto tw-my-4 tw-p-2 ">
        {isLoading ? (
          <Spinners />
        ) : (
          <div className="md:tw-flex tw-no-wrap md:tw-mx-2" data-aos="zoom-in">
            <div className="tw-w-full md:tw-w-3/12 md:tw-mx-2">
              <div className="tw-bg-white tw-p-3 tw-border-t-4 tw-border-green-400">
                <div className="tw-image tw-overflow-hidden">
                  <img
                    className="tw-h-auto tw-w-full tw-mx-auto tw-rounded-md"
                    src={category.imageUrl}
                    alt={category.name}
                  />
                </div>
                <h1 className="tw-text-gray-900 tw-font-bold tw-text-xl tw-my-1">
                  {category.name}
                </h1>
                <ul className="tw-bg-gray-100 tw-text-gray-600 hover:tw-text-gray-700 hover:tw-shadow tw-py-2 tw-px-3 tw-mt-3 tw-rounded tw-shadow-sm">
                  <li className="tw-flex tw-items-center tw-py-3">
                    <span>Status</span>
                    <span className="tw-ml-auto">
                      <span className="tw-bg-green-500 tw-py-1 tw-px-2 tw-rounded"></span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="tw-w-full md:tw-w-9/12 tw-mx-2">
              <div className="tw-bg-gray-100 tw-p-3 tw-shadow-sm tw-rounded-sm">
                <div className="tw-flex tw-items-center tw-space-x-2 tw-font-semibold tw-text-gray-900">
                  <span className="tw-tracking-wide">About</span>
                </div>
                <div className="tw-text-gray-700">
                  <div className="tw-grid md:tw-grid-cols-2 tw-text-sm tw-gap-4">
                    <div className="tw-grid tw-grid-cols-2">
                      <div className="tw-px-4 tw-py-2 tw-font-semibold">ID</div>
                      <div className="tw-px-4 tw-py-2">{category.id}</div>
                    </div>
                    <div className="tw-grid tw-grid-cols-2">
                      <div className="tw-px-4 tw-py-2 tw-font-semibold">
                        Name
                      </div>
                      <div className="tw-px-4 tw-py-2">{category.name}</div>
                    </div>
                    <div className="tw-grid tw-grid-cols-2">
                      <div className="tw-px-4 tw-py-2 tw-font-semibold">
                        Created At
                      </div>
                      <div className="tw-px-4 tw-py-2">
                        {new Date(category.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <div className="tw-grid tw-grid-cols-2">
                      <div className="tw-px-4 tw-py-2 tw-font-semibold">
                        Updated At
                      </div>
                      <div className="tw-px-4 tw-py-2">
                        {new Date(category.updatedAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
