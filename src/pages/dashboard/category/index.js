import AdminLayout from "@/layout/AdminLayout";
import Modal from "@/components/Modal";
import { useEffect, useState } from "react";
import {
  fetchCategory,
  fetchCategoryById,
  deleteCategory,
  updateCategory,
  createCategory,
  uploadImage,
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
import CategoryForm from "@/components/CategoryForm";
import Spinners from "@/components/Spinners";
import DashboardCard from "@/components/DashboardCard";

export default function CategoryPageDashboard() {
  const dispatch = useDispatch();
  const { isEditModalOpen, isCreateModalOpen, isDeleteModalOpen } = useSelector(
    (state) => state.modal
  );
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(6);
  const currentCategories = categories?.slice(
    currentPage * categoriesPerPage - categoriesPerPage,
    currentPage * categoriesPerPage
  );

  useEffect(() => {
    fetchAndSetCategories();
  }, []);

  const fetchAndSetCategories = async () => {
    setLoading(true);
    try {
      const { data } = await fetchCategory();
      setCategories(data);
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
      setSelectedCategory((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleToggleEdit = async (categoryId) => {
    setImageFile(null);
    if (categoryId) {
      try {
        const { data } = await fetchCategoryById(categoryId);
        setSelectedCategory(data);
        dispatch(toggleEditModal());
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      setSelectedCategory({ name: "", imageUrl: "" });
      dispatch(toggleCreateModal());
    }
  };

  const handleCategoryOperation = async (operation) => {
    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    let imageUrl = selectedCategory.imageUrl;
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
    const categoryData = { name: selectedCategory.name, imageUrl };
    if (!categoryData.name || !categoryData.imageUrl) {
      toast.error("Category name and image must be provided.");
      setIsSubmitting(false);
      return;
    }
    try {
      let response;
      if (operation === updateCategory) {
        response = await operation(selectedCategory.id, categoryData, token);
      } else {
        response = await operation(categoryData, token);
      }
      if (!response.error) {
        setCategories((prevCategories) => {
          if (operation === updateCategory) {
            return prevCategories.map((category) =>
              category.id === selectedCategory.id
                ? { ...category, ...categoryData }
                : category
            );
          } else {
            return [...prevCategories, { ...categoryData }];
          }
        });
        toast.success(response.message);
        resetCategoryState();
        fetchAndSetCategories();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
      console.log(imageUrl, imageFile, selectedCategory.imageUrl);
    }
  };

  const handleEdit = () => handleCategoryOperation(updateCategory);
  const handleCreate = () => handleCategoryOperation(createCategory);
  const handleDelete = async (categoryId) => {
    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    try {
      const response = await deleteCategory(categoryId, token);
      if (!response.error) {
        setCategories(
          categories.filter((category) => category.id !== categoryId)
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

  const handleToggleDelete = (categoryId) => {
    setSelectedCategory(
      categories.find((category) => category.id === categoryId)
    );
    dispatch(toggleDeleteModal());
  };

  const resetCategoryState = () => {
    if (isEditModalOpen) {
      dispatch(toggleEditModal());
    } else if (isCreateModalOpen) {
      dispatch(toggleCreateModal());
    } else if (isDeleteModalOpen) {
      dispatch(toggleDeleteModal());
    }
    setImageFile(null);
    setSelectedCategory(null);
  };

  return (
    <AdminLayout>
      {loading ? (
        <Spinners />
      ) : (
        <div className="tw-container tw-mx-auto">
          <div className="tw-overflow-x-auto">
            <div className="tw-flex tw-justify-between tw-mb-4 tw-p-4">
              <h2 className="tw-text-gray-500 tw-font-bold tw-text-lg md:tw-text-xl">
                Category List
              </h2>
              <Button
                title="Create Category"
                style="tw-bg-green-500 hover:tw-bg-green-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded"
                onClick={() => handleToggleEdit(null)}
                disabled={isSubmitting}
              />
            </div>
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4">
              {currentCategories?.map((category) => (
                <DashboardCard
                  key={category.id}
                  linkId={`/dashboard/category/${category.id}`}
                  image={category.imageUrl}
                  name={category.name}
                  id={category.id}
                  createdAt={category.createdAt}
                  updatedAt={category.updatedAt}
                  onEdit={() => handleToggleEdit(category.id)}
                  onDelete={() => handleToggleDelete(category.id)}
                />
              ))}
            </div>
            <Pagination
              itemsCount={categories?.length}
              pageSize={categoriesPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <Modal
          title={"Edit Category"}
          buttonText={"Edit Category"}
          onClose={resetCategoryState}
          onSubmit={handleEdit}
          isSubmitting={isSubmitting}
        >
          <CategoryForm
            selectedCategory={selectedCategory}
            onInputChange={handleInputChange}
          />
        </Modal>
      )}
      {isCreateModalOpen && (
        <Modal
          title={"Create New Category"}
          buttonText={"Create Category"}
          onClose={resetCategoryState}
          onSubmit={handleCreate}
          isSubmitting={isSubmitting}
        >
          <CategoryForm
            selectedCategory={selectedCategory}
            onInputChange={handleInputChange}
          />
        </Modal>
      )}
      {isDeleteModalOpen && (
        <Modal
          title={"Delete Category"}
          buttonText={"Delete Category"}
          onClose={resetCategoryState}
          onSubmit={() => handleDelete(selectedCategory?.id)}
          isSubmitting={isSubmitting}
        >
          <p>Are you sure you want to delete this category?</p>
        </Modal>
      )}
    </AdminLayout>
  );
}
