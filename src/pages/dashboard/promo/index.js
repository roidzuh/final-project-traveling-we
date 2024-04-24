import AdminLayout from "@/layout/AdminLayout";
import Modal from "@/components/Modal";
import { useEffect, useState } from "react";
import {
  fetchPromo,
  fetchPromoById,
  deletePromo,
  updatePromo,
  createPromo,
  uploadImage,
} from "@/utils/api";
import { toast } from "react-toastify";
import Pagination from "@/components/Pagination";
import Button from "@/components/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleEditModal,
  toggleCreateModal,
} from "@/features/slices/modalSlice";
import PromoForm from "@/components/PromoForm";
import Spinners from "@/components/Spinners";
import DashboardCard from "@/components/DashboardCard";

export default function PromoPageDashboard() {
  const dispatch = useDispatch();
  const { isEditModalOpen, isCreateModalOpen } = useSelector(
    (state) => state.modal
  );
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [promosPerPage] = useState(6);
  const currentPromos = promos.slice(
    currentPage * promosPerPage - promosPerPage,
    currentPage * promosPerPage
  );

  useEffect(() => {
    fetchAndSetPromos();
  }, []);

  const fetchAndSetPromos = async () => {
    setLoading(true);
    try {
      const { data } = await fetchPromo();
      setPromos(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = ({ target: { name, value, files } }) => {
    if (name === "imageUrl") {
      setImageFile(files[0]);
    } else {
      setSelectedPromo((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleToggleEdit = async (promoId) => {
    setImageFile(null);
    if (promoId) {
      try {
        const { data } = await fetchPromoById(promoId);
        setSelectedPromo(data);
        dispatch(toggleEditModal());
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      setSelectedPromo({
        title: "",
        description: "",
        imageUrl: "",
        terms_condition: "",
        promo_code: "",
        promo_discount_price: "",
        minimum_claim_price: "",
      });
      dispatch(toggleCreateModal());
    }
  };

  const handlePromoOperation = async (operation) => {
    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    let imageUrl = selectedPromo.imageUrl;
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
    const promoData = {
      title: selectedPromo.title,
      description: selectedPromo.description,
      imageUrl,
      terms_condition: selectedPromo.terms_condition,
      promo_code: selectedPromo.promo_code,
      promo_discount_price: Number(selectedPromo.promo_discount_price),
      minimum_claim_price: Number(selectedPromo.minimum_claim_price),
    };
    if (
      !promoData.title ||
      !promoData.description ||
      !promoData.imageUrl ||
      !promoData.terms_condition ||
      !promoData.promo_code ||
      !promoData.promo_discount_price ||
      !promoData.minimum_claim_price
    ) {
      toast.error("All fields must be provided.");
      setIsSubmitting(false);
      return;
    }
    try {
      let response;
      if (operation === updatePromo) {
        response = await operation(selectedPromo.id, promoData, token);
      } else {
        response = await operation(promoData, token);
      }
      if (!response.error) {
        setPromos((prevPromos) => {
          if (operation === updatePromo) {
            return prevPromos.map((promo) =>
              promo.id === selectedPromo.id ? { ...promo, ...promoData } : promo
            );
          } else {
            return [...prevPromos, { ...promoData }];
          }
        });
        toast.success(response.message);
        resetPromoState();
        fetchAndSetPromos();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = () => handlePromoOperation(updatePromo);
  const handleCreate = () => handlePromoOperation(createPromo);
  const handleDelete = async (promoId) => {
    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    try {
      const response = await deletePromo(promoId, token);
      if (!response.error) {
        setPromos(promos.filter((promo) => promo.id !== promoId));
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

  const resetPromoState = () => {
    if (isEditModalOpen) {
      dispatch(toggleEditModal());
    } else {
      dispatch(toggleCreateModal());
    }
    setImageFile(null);
    setSelectedPromo(null);
  };

  return (
    <AdminLayout>
      {loading ? (
        <Spinners />
      ) : (
        <div className="tw-container tw-mx-auto">
          <div className="tw-overflow-x-auto">
            <div className="tw-flex tw-justify-between tw-mb-4 tw-p-4">
              <h2 className="tw-text-gray-500 tw-font-bold">Promo List</h2>
              <Button
                title="Create Promo"
                style="tw-bg-green-500 hover:tw-bg-green-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded"
                onClick={() => handleToggleEdit(null)}
                disabled={isSubmitting}
              />
            </div>
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4">
              {currentPromos?.map((promo) => (
                <DashboardCard
                  key={promo.id}
                  image={promo.imageUrl}
                  name={promo.title}
                  id={promo.id}
                  createdAt={promo.createdAt}
                  updatedAt={promo.updatedAt}
                  onEdit={() => handleToggleEdit(promo.id)}
                  onDelete={() => handleDelete(promo.id)}
                />
              ))}
            </div>
            <Pagination
              itemsCount={promos.length}
              pageSize={promosPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <Modal
          title={"Edit Promo"}
          buttonText={"Edit Promo"}
          onClose={resetPromoState}
          onSubmit={handleEdit}
          isSubmitting={isSubmitting}
        >
          <PromoForm
            selectedPromo={selectedPromo}
            onInputChange={handleInputChange}
          />
        </Modal>
      )}
      {isCreateModalOpen && (
        <Modal
          title={"Create New Promo"}
          buttonText={"Create Promo"}
          onClose={resetPromoState}
          onSubmit={handleCreate}
          isSubmitting={isSubmitting}
        >
          <PromoForm
            selectedPromo={selectedPromo}
            onInputChange={handleInputChange}
          />
        </Modal>
      )}
    </AdminLayout>
  );
}
