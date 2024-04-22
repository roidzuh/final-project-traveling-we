import { useState, useEffect } from "react";
import MainLayout from "@/layout/MainLayout";
import {
  fetchActivity,
  fetchActivityByCategoryId,
  fetchCategory,
} from "../../utils/api";
import Link from "next/link";

export default function ActivityPage() {
  const [activities, setActivities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchActivity().then((data) => {
      setActivities(data.data);
      setIsLoading(false);
    });
    fetchCategory().then((data) => {
      setCategories(data.data);
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

  if (isLoading) {
    return (
      <MainLayout>
        <div className="tw-container tw-mx-auto tw-my-12 tw-p-5 tw-min-h-screen tw-flex tw-justify-center tw-items-center">
          <div>Loading...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="tw-container tw-mx-auto tw-my-24 tw-p-5 tw-min-h-screen">
        <div className="tw-mb-5">
          <select
            onChange={handleCategoryChange}
            className="form-select tw-block tw-w-full tw-mt-1"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 tw-gap-4">
          {activities.map((activity) => (
            <Link
              key={activity.id}
              href={`/activity/${activity.id}`}
              className="tw-bg-white tw-rounded-lg tw-shadow tw-overflow-hidden tw-no-underline tw-text-gray-600"
            >
              <img
                src={activity.imageUrls[1]}
                alt={activity.title}
                className="tw-w-full tw-h-48 tw-object-cover"
              />
              <div className="tw-p-4">
                <h3 className="tw-text-lg tw-font-semibold">
                  {activity.title}
                </h3>
                <p>{activity.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
