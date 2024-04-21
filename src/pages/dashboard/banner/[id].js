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
    setLoading(true);
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
        <>
          <div className="mx-auto my-5 bg-white p-5 rounded-lg shadow max-w-[900px]">
            <div className="flex gap-5 items-center">
              <img
                src={banner.imageUrl}
                alt={banner.name}
                className="w-64 h-64 object-cover rounded-lg"
              />
              <div>
                <p className="text-lg font-semibold">ID: {banner.id}</p>
                <p className="text-lg font-semibold">Name: {banner.name}</p>
                <p className="text-lg font-semibold">
                  Created At:{" "}
                  {new Date(banner.createdAt).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-lg font-semibold">
                  Updated At:{" "}
                  {new Date(banner.updatedAt).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto my-5 bg-white p-5 rounded-lg shadow max-w-[900px]">
            <h1 className="text-2xl font-bold mb-4">Edit Banner</h1>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-3">
                <Input
                  label="name"
                  name="name"
                  type="text"
                  placeholder={"Banner Name"}
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
                    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 self-end"
                  }
                />
              </div>
            </form>
          </div>
        </>
      )}
    </AdminLayout>
  );
}
