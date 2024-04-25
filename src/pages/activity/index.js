import { useState, useEffect } from "react";
import MainLayout from "@/layout/MainLayout";
import {
  fetchActivity,
  fetchActivityByCategoryId,
  fetchCategory,
} from "../../utils/api";
import Link from "next/link";
import Spinners from "@/components/Spinners";
import { FaStar, FaLocationDot } from "react-icons/fa6";

export default function ActivityPage() {
  const [activities, setActivities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchActivity().then((data) => {
      setActivities(data.data);
      setIsLoading(false);
    });
    setIsCategoryLoading(true);
    fetchCategory().then((data) => {
      setCategories(data.data);
      setIsCategoryLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchActivityByCategoryId(selectedCategory).then((data) => {
        setActivities(data.data);
      });
    } else {
      fetchActivity().then((data) => {
        setActivities(data.data);
      });
    }
  }, [selectedCategory]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <MainLayout>
      {isLoading || isCategoryLoading ? (
        <Spinners />
      ) : (
        <div className="tw-container tw-mx-auto tw-my-24 tw-p-5 tw-min-h-screen">
          <div className="tw-mb-5">
            <select
              onChange={handleCategoryChange}
              className="form-select tw-block tw-w-full tw-mt-1"
            >
              <option value="">All Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          {activities.length === 0 ? (
            <div className="tw-text-center tw-text-gray-500">Data kosong</div>
          ) : (
            <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 tw-gap-4">
              {activities.map((activity) => (
                <Link
                  key={activity.id}
                  href={`/activity/${activity.id}`}
                  className="tw-bg-white tw-rounded-lg tw-shadow-md tw-relative tw-no-underline tw-text-gray-800 tw-border tw-border-gray-300 hover:tw-shadow-lg"
                >
                  <img
                    src={activity?.imageUrls[0]}
                    alt={activity.title}
                    className="tw-w-full tw-h-48 tw-object-cover tw-rounded-t-lg"
                  />
                  <div className="tw-absolute tw-top-0 tw-left-0 tw-bg-blue-500 tw-rounded-tl-lg tw-rounded-br-lg">
                    <p className="tw-text-sm tw-font-semibold tw-text-white tw-p-2 tw-m-0">
                      {activity.title}
                    </p>
                  </div>
                  <div className="tw-p-4">
                    <h3 className="tw-text-lg tw-font-semibold">
                      {activity.title}
                    </h3>
                    <div className="tw-flex tw-items-center tw-mb-2">
                      <FaLocationDot className="tw-text-red-500 tw-mr-2" />
                      <p className="tw-m-0">{activity.address}</p>
                    </div>
                    <div className="tw-flex tw-items-center tw-mb-2">
                      <FaStar className="tw-text-yellow-500 tw-mr-2" />
                      <p className="tw-m-0">
                        {activity.rating} ({activity.total_reviews} reviews)
                      </p>
                    </div>
                    <div className="tw-flex tw-justify-between tw-items-center">
                      <p className="tw-line-through tw-text-gray-500">
                        IDR {activity.price}
                      </p>
                      <p className="tw-font-bold tw-text-lg">
                        IDR {activity.price_discount}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </MainLayout>
  );
}
