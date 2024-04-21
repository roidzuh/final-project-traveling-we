import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchActivityById } from "../../utils/api";
import MainLayout from "@/layout/MainLayout";

export default function ActivityDetail() {
  const [activity, setActivity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetchActivityById(id).then((data) => {
        setActivity(data.data);
        setIsLoading(false);
      });
    }
  }, [id]);

  return (
    <MainLayout>
      <div className="container mx-auto my-16 p-5 min-h-[2000px] lg:min-h-[1200px] ">
        {isLoading ? (
          <div className="container mx-auto my-16 p-5 flex justify-center items-center">
            <div>Loading...</div>
          </div>
        ) : (
          <div className="md:flex no-wrap md:-mx-2">
            <div className="w-full md:w-3/12 md:mx-2">
              <div className="bg-white p-3 border-t-4 border-green-400">
                <div className="image overflow-hidden">
                  <img
                    className="h-auto w-full mx-auto rounded-md"
                    src={activity.imageUrls[1]}
                    alt={activity.title}
                  />
                </div>
                <h1 className="text-gray-900 font-bold text-xl my-1">
                  {activity.title}
                </h1>
                <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 rounded shadow-sm">
                  <li className="flex items-center py-3">
                    <span>Status</span>
                    <span className="ml-auto">
                      <span className="bg-green-500 py-1 px-2 rounded"></span>
                    </span>
                  </li>

                  <li className="flex items-center py-3">
                    <span>Category</span>
                    <span className="ml-auto">{activity.category.name}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full md:w-9/12 mx-2">
              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="flex items-center space-x-2 font-semibold text-gray-900">
                  <span className="tracking-wide">About</span>
                </div>
                <div className="text-gray-700">
                  <div className="grid md:grid-cols-2 text-sm gap-4">
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Title</div>
                      <div className="px-4 py-2">{activity.title}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Description</div>
                      <div className="px-4 py-2">{activity.description}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Address</div>
                      <div className="px-4 py-2">{activity.address}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">City</div>
                      <div className="px-4 py-2">{activity.city}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Facilities</div>
                      <div className="px-4 py-2">{activity.facilities}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Price</div>
                      <div className="px-4 py-2">{activity.price}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        Price Discount
                      </div>
                      <div className="px-4 py-2">{activity.price_discount}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Province</div>
                      <div className="px-4 py-2">{activity.province}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Rating</div>
                      <div className="px-4 py-2">{activity.rating}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        Total Review
                      </div>
                      <div className="px-4 py-2">{activity.total_reviews}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
