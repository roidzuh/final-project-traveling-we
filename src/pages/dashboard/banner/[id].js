import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { fetchBannerById, updateBanner, uploadImage } from "@/utils/api";
import { toast } from "react-toastify";
import AdminLayout from "@/layout/AdminLayout";

export default function EditBannerPage() {
  const [banner, setBanner] = useState({
    name: "",
    imageUrl: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const getBanner = async () => {
      setLoading(true);
      const fetchedBanner = await fetchBannerById(id);
      if (fetchedBanner.error) {
        toast.error(fetchedBanner.message);
      } else {
        setBanner(fetchedBanner.data);
      }
      setLoading(false);
    };

    if (id) {
      getBanner();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "imageFile") {
      setImageFile(e.target.files[0]);
    } else {
      setBanner((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Mulai loading
    const token = localStorage.getItem("token");
    let imageUrl = banner.imageUrl;
    if (imageFile) {
      const uploadResponse = await uploadImage(imageFile, token);
      if (uploadResponse.error) {
        toast.error(uploadResponse.message);
        setLoading(false);
        return;
      }
      imageUrl = uploadResponse.url;
    }
    const response = await updateBanner(id, { ...banner, imageUrl }, token);
    if (response.error) {
      toast.error(response.message);
    } else {
      toast.success(response.message);
      router.push("/dashboard/banner");
    }
    setLoading(false);
  };

  return (
    <AdminLayout>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="container mx-auto mt-5">
          <h1 className="text-2xl font-bold mb-5">Edit Banner</h1>
          <form onSubmit={handleSubmit}>
            <Input
              label="name"
              name="name"
              type="text"
              value={banner.name}
              onChange={handleInputChange}
            />
            <Input
              label="Image File"
              name="imageFile"
              type="file"
              onChange={handleInputChange}
            />
            <Button
              title="Update Banner"
              type="submit"
              style={
                "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
              }
            />
          </form>
        </div>
      )}
    </AdminLayout>
  );
}
