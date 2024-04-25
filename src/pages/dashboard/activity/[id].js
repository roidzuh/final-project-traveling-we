import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchActivityById } from "@/utils/api";
import Spinners from "@/components/Spinners";
import AdminLayout from "@/layout/AdminLayout";

export default function DashboardActivityDetail() {
  const [activity, setActivity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
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

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <AdminLayout>
      <div className="tw-container tw-mx-auto tw-my-4 tw-p-2">
        {isLoading ? (
          <Spinners />
        ) : (
          <div className="md:tw-flex tw-no-wrap md:tw-mx-2">
            <div className="tw-w-full md:tw-w-3/12 md:tw-mx-2">
              <div className="tw-bg-white tw-p-3 tw-border-t-4 tw-border-green-400">
                <div className="tw-image tw-overflow-hidden">
                  <img
                    className="tw-h-auto tw-w-full tw-mx-auto tw-rounded-md"
                    src={activity?.imageUrls[0]}
                    alt={activity.title}
                  />
                </div>
                <h1 className="tw-text-gray-900 tw-font-bold tw-text-xl tw-my-1">
                  {activity.title}
                </h1>
                <ul className="tw-bg-gray-100 tw-text-gray-600 hover:tw-text-gray-700 hover:tw-shadow tw-py-2 tw-px-3 tw-mt-3 tw-rounded tw-shadow-sm">
                  <li className="tw-flex tw-items-center tw-py-3">
                    <span>Status</span>
                    <span className="tw-ml-auto">
                      <span className="tw-bg-green-500 tw-py-1 tw-px-2 tw-rounded"></span>
                    </span>
                  </li>

                  <li className="tw-flex tw-items-center tw-py-3">
                    <span>Category</span>
                    <span className="tw-ml-auto">{activity.category.name}</span>
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
                      <div className="tw-px-4 tw-py-2">{activity.id}</div>
                    </div>
                    <div className="tw-grid tw-grid-cols-2">
                      <div className="tw-px-4 tw-py-2 tw-font-semibold">
                        Title
                      </div>
                      <div className="tw-px-4 tw-py-2">{activity.title}</div>
                    </div>
                    <div className="tw-grid tw-grid-cols-2">
                      <div className="tw-px-4 tw-py-2 tw-font-semibold">
                        Description
                      </div>
                      <div className="tw-px-4 tw-py-2">
                        {activity.description.length > 100 ? (
                          showFullDescription ? (
                            <span>
                              {activity.description}{" "}
                              <span
                                onClick={toggleDescription}
                                className="tw-text-blue-500 tw-cursor-pointer tw-underline"
                              >
                                Show less
                              </span>
                            </span>
                          ) : (
                            <span>
                              {activity.description.substring(0, 100)}...{" "}
                              <span
                                onClick={toggleDescription}
                                className="tw-text-blue-500 tw-cursor-pointer tw-underline"
                              >
                                Show more
                              </span>
                            </span>
                          )
                        ) : (
                          <span>{activity.description}</span>
                        )}
                      </div>
                    </div>
                    <div className="tw-grid tw-grid-cols-2">
                      <div className="tw-px-4 tw-py-2 tw-font-semibold">
                        Address
                      </div>
                      <div className="tw-px-4 tw-py-2">{activity.address}</div>
                    </div>
                    <div className="tw-grid tw-grid-cols-2">
                      <div className="tw-px-4 tw-py-2 tw-font-semibold">
                        City
                      </div>
                      <div className="tw-px-4 tw-py-2">{activity.city}</div>
                    </div>
                    <div className="tw-grid tw-grid-cols-2">
                      <div className="tw-px-4 tw-py-2 tw-font-semibold">
                        Facilities
                      </div>
                      <div className="tw-px-4 tw-py-2">
                        {activity.facilities}
                      </div>
                    </div>
                    <div className="tw-grid tw-grid-cols-2">
                      <div className="tw-px-4 tw-py-2 tw-font-semibold">
                        Price
                      </div>
                      <div className="tw-px-4 tw-py-2">
                        IDR {activity.price}
                      </div>
                    </div>
                    <div className="tw-grid tw-grid-cols-2">
                      <div className="tw-px-4 tw-py-2 tw-font-semibold">
                        Price Discount
                      </div>
                      <div className="tw-px-4 tw-py-2">
                        IDR {activity.price_discount}
                      </div>
                    </div>
                    <div className="tw-grid tw-grid-cols-2">
                      <div className="tw-px-4 tw-py-2 tw-font-semibold">
                        Province
                      </div>
                      <div className="tw-px-4 tw-py-2">{activity.province}</div>
                    </div>
                    <div className="tw-grid tw-grid-cols-2">
                      <div className="tw-px-4 tw-py-2 tw-font-semibold">
                        Rating
                      </div>
                      <div className="tw-px-4 tw-py-2">{activity.rating}</div>
                    </div>
                    <div className="tw-grid tw-grid-cols-2">
                      <div className="tw-px-4 tw-py-2 tw-font-semibold">
                        Total Review
                      </div>
                      <div className="tw-px-4 tw-py-2">
                        {activity.total_reviews}
                      </div>
                    </div>
                    <div className="tw-grid tw-grid-cols-2">
                      <div className="tw-px-4 tw-py-2 tw-font-semibold">
                        Created At
                      </div>
                      <div className="tw-px-4 tw-py-2">
                        {new Date(activity.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <div className="tw-grid tw-grid-cols-2">
                      <div className="tw-px-4 tw-py-2 tw-font-semibold">
                        Updated At
                      </div>
                      <div className="tw-px-4 tw-py-2">
                        {new Date(activity.updatedAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="tw-w-full tw-mx-auto tw-my-8">
          <div className="tw-bg-gray-100 tw-p-3 tw-shadow-sm tw-rounded-sm">
            <div className="tw-px-4 tw-py-2 tw-font-semibold">Location Map</div>
            <div
              className="tw-px-4 tw-py-2 tw-w-full"
              dangerouslySetInnerHTML={{
                __html: activity?.location_maps.replace(
                  /width="[^"]*"/,
                  'width="100%"'
                ),
              }}
            ></div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
