import AdminLayout from "@/layout/AdminLayout";
import Modal from "@/components/Modal";
import { useEffect, useState } from "react";
import {
  fetchActivity,
  fetchActivityById,
  deleteActivity,
  uploadImage,
  updateActivity,
  createActivity,
  fetchCategory,
} from "@/utils/api";
import { toast } from "react-toastify";
import Pagination from "@/components/Pagination";
import Button from "@/components/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleEditModal,
  toggleCreateModal,
  toggleDeleteModal,
} from "@/features/slices/modalSlice";
import ActivityForm from "@/components/ActivityForm";
import Spinners from "@/components/Spinners";
import DashboardCard from "@/components/DashboardCard";

export default function ActivityPageDashboard() {
  const dispatch = useDispatch();
  const { isEditModalOpen, isCreateModalOpen, isDeleteModalOpen } = useSelector(
    (state) => state.modal
  );
  const [activities, setActivities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activitiesPerPage] = useState(6);
  const currentActivities = activities?.slice(
    currentPage * activitiesPerPage - activitiesPerPage,
    currentPage * activitiesPerPage
  );

  useEffect(() => {
    fetchAndSetActivities();
    fetchAndSetCategories();
  }, []);

  const fetchAndSetCategories = async () => {
    try {
      const { data } = await fetchCategory();
      setCategories(data);
    } catch (error) {
      toast.error("Failed to fetch category data: " + error.message);
    }
  };

  const fetchAndSetActivities = async () => {
    setLoading(true);
    try {
      const { data } = await fetchActivity();
      setActivities(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = ({ target: { name, value, files } }) => {
    if (name === "image") {
      setImageFile(files[0]);
    } else {
      setSelectedActivity((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleToggleEdit = async (activityId) => {
    setImageFile(null);
    if (activityId) {
      try {
        const { data } = await fetchActivityById(activityId);
        setSelectedActivity(data);
        dispatch(toggleEditModal());
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      setSelectedActivity({
        categoryId: "",
      });
      dispatch(toggleCreateModal());
    }
  };

  const handleActivityOperation = async (operation) => {
    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    let imageUrls = selectedActivity.imageUrls || [];
    if (imageFile) {
      try {
        const { url, error, message } = await uploadImage(imageFile, token);
        if (error) {
          toast.error(message);
          setIsSubmitting(false);
          return;
        }
        imageUrls[0] = url; // Pastikan image update adalah image array ke 0
      } catch (error) {
        toast.error(error.message);
        setIsSubmitting(false);
        return;
      }
    }
    const activityData = {
      categoryId: selectedActivity.categoryId,
      title: selectedActivity.title,
      description: selectedActivity.description,
      price: Number(selectedActivity.price),
      price_discount: Number(selectedActivity.price_discount),
      rating: Number(selectedActivity.rating),
      total_reviews: Number(selectedActivity.total_reviews),
      facilities: selectedActivity.facilities,
      address: selectedActivity.address,
      province: selectedActivity.province,
      city: selectedActivity.city,
      location_maps: selectedActivity.location_maps,
      imageUrls: imageUrls,
    };
    if (
      !activityData.categoryId ||
      !activityData.title ||
      !activityData.description ||
      !activityData.price ||
      !activityData.price_discount ||
      !activityData.rating ||
      !activityData.total_reviews ||
      !activityData.facilities ||
      !activityData.address ||
      !activityData.province ||
      !activityData.city ||
      !activityData.location_maps ||
      !activityData.imageUrls[0]
    ) {
      toast.error("All fields must be filled");
      setIsSubmitting(false);
      return;
    }
    try {
      let response;
      if (operation === updateActivity) {
        response = await operation(selectedActivity.id, activityData, token);
      } else {
        response = await operation(activityData, token);
      }
      if (!response.error) {
        setActivities((prevActivities) => {
          if (operation === updateActivity) {
            return prevActivities.map((activity) =>
              activity.id === selectedActivity.id
                ? { ...activity, ...activityData }
                : activity
            );
          } else {
            return [...prevActivities, { ...activityData }];
          }
        });
        toast.success(response.message);
        resetActivityState();
        fetchAndSetActivities();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = () => handleActivityOperation(updateActivity);

  const handleCreate = () => handleActivityOperation(createActivity);

  const handleDelete = async (activityId) => {
    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    try {
      const response = await deleteActivity(activityId, token);
      if (!response.error) {
        setActivities(
          activities.filter((activity) => activity.id !== activityId)
        );
        toast.success(response.message);
        dispatch(toggleDeleteModal());
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleDelete = (activityId) => {
    setSelectedActivity(
      activities.find((activity) => activity.id === activityId)
    );
    dispatch(toggleDeleteModal());
  };

  const resetActivityState = () => {
    if (isEditModalOpen) {
      dispatch(toggleEditModal());
    } else if (isCreateModalOpen) {
      dispatch(toggleCreateModal());
    } else if (isDeleteModalOpen) {
      dispatch(toggleDeleteModal());
    }
    setImageFile(null);
    setSelectedActivity(null);
  };

  return (
    <AdminLayout>
      {loading ? (
        <Spinners />
      ) : (
        <div className="tw-container tw-mx-auto">
          <div className="tw-overflow-x-auto tw-pb-8">
            <div className="tw-flex tw-justify-between tw-mb-4 tw-p-4">
              <h2 className="tw-text-gray-500 tw-font-bold tw-text-lg md:tw-text-xl">
                Activity List
              </h2>
              <Button
                title="Create Activity"
                style="tw-bg-green-500 hover:tw-bg-green-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded"
                onClick={() => handleToggleEdit(null)}
                disabled={isSubmitting}
              />
            </div>
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4">
              {currentActivities?.map((activity) => (
                <DashboardCard
                  key={activity.id}
                  linkId={`/dashboard/activity/${activity.id}`}
                  image={activity?.imageUrls[0]}
                  name={activity.title}
                  id={activity.id}
                  createdAt={activity.createdAt}
                  updatedAt={activity.updatedAt}
                  onEdit={() => handleToggleEdit(activity.id)}
                  onDelete={() => handleToggleDelete(activity.id)}
                />
              ))}
            </div>
            <Pagination
              itemsCount={activities?.length}
              pageSize={activitiesPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <Modal
          title={"Edit Activity"}
          buttonText={"Edit Activity"}
          onClose={resetActivityState}
          onSubmit={handleEdit}
          isSubmitting={isSubmitting}
        >
          <ActivityForm
            selectedActivity={selectedActivity}
            onInputChange={handleInputChange}
            categories={categories}
          />
        </Modal>
      )}
      {isCreateModalOpen && (
        <Modal
          title={"Create New Activity"}
          buttonText={"Create Activity"}
          onClose={resetActivityState}
          onSubmit={handleCreate}
          isSubmitting={isSubmitting}
        >
          <ActivityForm
            selectedActivity={selectedActivity}
            onInputChange={handleInputChange}
            categories={categories}
          />
        </Modal>
      )}
      {isDeleteModalOpen && (
        <Modal
          title={"Delete Activity"}
          buttonText={"Delete Activity"}
          onClose={resetActivityState}
          onSubmit={() => handleDelete(selectedActivity?.id)}
          isSubmitting={isSubmitting}
        >
          <p>Are you sure you want to delete this activity?</p>
        </Modal>
      )}
    </AdminLayout>
  );
}
