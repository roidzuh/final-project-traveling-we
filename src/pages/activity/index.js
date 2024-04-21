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
        <div className="container mx-auto my-12 p-5 min-h-screen flex justify-center items-center">
          <div>Loading...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto my-12 p-5 min-h-screen">
        <div className="mb-5">
          <select
            onChange={handleCategoryChange}
            className="form-select block w-full mt-1"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {activities.map((activity) => (
            <Link
              key={activity.id}
              href={`/activity/${activity.id}`}
              className="bg-white rounded-lg shadow overflow-hidden no-underline text-gray-600"
            >
              <img
                src={activity.imageUrls[1]}
                alt={activity.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{activity.title}</h3>
                <p>{activity.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
