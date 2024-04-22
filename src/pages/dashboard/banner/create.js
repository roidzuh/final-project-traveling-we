import { useState } from "react";
import { useRouter } from "next/router";
import { uploadImage, createBanner } from "@/utils/api";
import AdminLayout from "@/layout/AdminLayout";
import { toast } from "react-toastify";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function CreateBanner() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !name) {
      toast.error("Semua field harus diisi");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const uploadResponse = await uploadImage(image, token);
      if (uploadResponse.error) {
        toast.error(uploadResponse.message);
        setLoading(false);
        return;
      }

      const createResponse = await createBanner(
        {
          name,
          imageUrl: uploadResponse.url,
        },
        token
      );

      if (createResponse.error) {
        toast.error(createResponse.message);
        setLoading(false);
        return;
      }

      toast.success(createResponse.message);
      router.push("/dashboard/banner");
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="tw-flex tw-justify-center tw-mt-10">
        <div className="tw-p-4 tw-bg-slate-200 tw-rounded tw-w-full tw-max-w-[900px] tw-shadow-md">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <h5 className="tw-text-2xl tw-font-bold tw-mb-4">
                Create Banner
              </h5>
              <form onSubmit={handleSubmit}>
                <div className="tw-flex tw-flex-col tw-gap-4">
                  <div>
                    <label htmlFor="name" className="tw-block tw-mb-2">
                      Banner Name :
                    </label>
                    <Input
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style="tw-border tw-p-2 tw-w-full "
                    />
                  </div>
                  <div>
                    <label htmlFor="image" className="tw-block tw-mb-2">
                      Banner Image :
                    </label>
                    <Input
                      type="file"
                      name="image"
                      style="tw-border tw-p-2 tw-w-full "
                      onChange={handleImageChange}
                    />
                  </div>
                  <Button
                    title="Create Banner"
                    type="submit"
                    style="tw-bg-blue-500 tw-text-white tw-p-2 tw-rounded hover:tw-bg-blue-700 tw-self-end"
                  />
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
