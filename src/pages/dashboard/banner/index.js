import AdminLayout from "@/layout/AdminLayout";
import Modal from "@/components/Modal";
import { useEffect, useState } from "react";
import {
  fetchBanners,
  fetchBannerById,
  deleteBanner,
  uploadImage,
  updateBanner,
  createBanner,
} from "@/utils/api";
import { toast } from "react-toastify";
import Pagination from "@/components/Pagination";
import Button from "@/components/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleEditModal,
  toggleCreateModal,
} from "@/features/slices/modalSlice";
import BannerForm from "@/components/BannerForm";
import Spinners from "@/components/Spinners";
import DashboardCard from "@/components/DashboardCard";

export default function BannerPageDashboard() {
  const dispatch = useDispatch();
  const { isEditModalOpen, isCreateModalOpen } = useSelector(
    (state) => state.modal
  );
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [bannersPerPage] = useState(6);
  const currentBanners = banners?.slice(
    currentPage * bannersPerPage - bannersPerPage,
    currentPage * bannersPerPage
  );

  useEffect(() => {
    fetchAndSetBanners();
  }, []);

  const fetchAndSetBanners = async () => {
    setLoading(true);
    try {
      const { data } = await fetchBanners();
      setBanners(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = ({ target: { name, value, files } }) => {
    if (name === "imageFile") {
      setImageFile(files[0]);
    } else {
      setSelectedBanner((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleToggleEdit = async (bannerId) => {
    setImageFile(null);
    if (bannerId) {
      try {
        const { data } = await fetchBannerById(bannerId);
        setSelectedBanner(data);
        dispatch(toggleEditModal());
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      setSelectedBanner({
        name: "",
        imageUrl: "",
      });
      dispatch(toggleCreateModal());
    }
  };

  const handleBannerOperation = async (operation) => {
    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    let imageUrl = selectedBanner.imageUrl;
    if (imageFile) {
      try {
        const { url, error, message } = await uploadImage(imageFile, token);
        if (error) {
          toast.error(message);
          setIsSubmitting(false);
          return;
        }
        imageUrl = url;
      } catch (error) {
        toast.error(error.message);
        setIsSubmitting(false);
        return;
      }
    }
    const bannerData = { ...selectedBanner, imageUrl };
    if (!bannerData.name || !bannerData.imageUrl) {
      toast.error("Banner name and image must be provided.");
      setIsSubmitting(false);
      return;
    }
    try {
      let response;
      if (operation === updateBanner) {
        response = await operation(selectedBanner.id, bannerData, token);
      } else {
        response = await operation(bannerData, token);
      }
      if (!response.error) {
        setBanners((prevBanners) => {
          if (operation === updateBanner) {
            return prevBanners.map((banner) =>
              banner.id === selectedBanner.id
                ? { ...banner, ...bannerData }
                : banner
            );
          } else {
            return [...prevBanners, { ...bannerData }];
          }
        });
        toast.success(response.message);
        resetBannerState();
        fetchAndSetBanners();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = () =>
    handleBannerOperation(updateBanner, selectedBanner.id);

  const handleCreate = () => handleBannerOperation(createBanner);

  const handleDelete = async (bannerId) => {
    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    try {
      const response = await deleteBanner(bannerId, token);
      if (!response.error) {
        setBanners(banners.filter((banner) => banner.id !== bannerId));
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetBannerState = () => {
    if (isEditModalOpen) {
      dispatch(toggleEditModal());
    } else {
      dispatch(toggleCreateModal());
    }
    setImageFile(null);
    setSelectedBanner(null);
  };

  return (
    <AdminLayout>
      {loading ? (
        <Spinners />
      ) : (
        <div className="tw-container tw-mx-auto">
          <div className="tw-overflow-x-auto">
            <div className="tw-flex tw-justify-between tw-mb-4 tw-p-4">
              <h2 className="tw-text-gray-500 tw-font-bold">Banner List</h2>
              <Button
                title="Create Banner"
                style="tw-bg-green-500 hover:tw-bg-green-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded"
                onClick={() => handleToggleEdit(null)}
                disabled={isSubmitting}
              />
            </div>
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4">
              {currentBanners?.map((banner) => (
                <DashboardCard
                  key={banner.id}
                  linkId={`/dashboard/banner/${banner.id}`}
                  image={banner.imageUrl}
                  name={banner.name}
                  id={banner.id}
                  createdAt={banner.createdAt}
                  updatedAt={banner.updatedAt}
                  onEdit={() => handleToggleEdit(banner.id)}
                  onDelete={() => handleDelete(banner.id)}
                />
              ))}
            </div>
            <Pagination
              itemsCount={banners?.length}
              pageSize={bannersPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <Modal
          title={"Edit Banner"}
          buttonText={"Edit Banner"}
          onClose={resetBannerState}
          onSubmit={handleEdit}
          isSubmitting={isSubmitting}
        >
          <BannerForm
            selectedBanner={selectedBanner}
            onInputChange={handleInputChange}
          />
        </Modal>
      )}
      {isCreateModalOpen && (
        <Modal
          title={"Create New Banner"}
          buttonText={"Create Banner"}
          onClose={resetBannerState}
          onSubmit={handleCreate}
          isSubmitting={isSubmitting}
        >
          <BannerForm
            selectedBanner={selectedBanner}
            onInputChange={handleInputChange}
          />
        </Modal>
      )}
    </AdminLayout>
  );
}
