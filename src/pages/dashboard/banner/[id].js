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
          <div className="tw-mx-auto tw-my-5 tw-bg-white tw-p-5 tw-rounded-lg tw-shadow tw-max-w-[900px]">
            <div className="tw-flex tw-gap-5 tw-items-center">
              <img
                src={banner.imageUrl}
                alt={banner.name}
                className="tw-w-64 tw-h-64 tw-object-cover tw-rounded-lg"
              />
              <div>
                <p className="tw-text-lg tw-font-semibold">ID: {banner.id}</p>
                <p className="tw-text-lg tw-font-semibold">
                  Name: {banner.name}
                </p>
                <p className="tw-text-lg tw-font-semibold">
                  Created At:{" "}
                  {new Date(banner.createdAt).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="tw-text-lg tw-font-semibold">
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

          <div className="tw-mx-auto tw-my-5 tw-bg-white tw-p-5 tw-rounded-lg tw-shadow tw-max-w-[900px]">
            <h1 className="tw-text-2xl tw-font-bold tw-mb-4">Edit Banner</h1>
            <form onSubmit={handleSubmit}>
              <div className="tw-flex tw-flex-col tw-gap-3">
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
                    "tw-bg-blue-500 hover:tw-bg-blue-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded tw-ml-2 tw-self-end"
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
