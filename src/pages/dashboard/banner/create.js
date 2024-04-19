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
      <div className="flex justify-center mt-10">
        <div className="p-4 bg-slate-200 rounded w-full max-w-[900px] shadow-md">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <h5 className="text-2xl font-bold mb-4">Create Banner</h5>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="name" className="block mb-2">
                      Banner Name :
                    </label>
                    <Input
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style="border p-2 w-full "
                    />
                  </div>
                  <div>
                    <label htmlFor="image" className="block mb-2">
                      Banner Image :
                    </label>
                    <Input
                      type="file"
                      name="image"
                      style="border p-2 w-full "
                      onChange={handleImageChange}
                    />
                  </div>
                  <Button
                    title="Create Banner"
                    type="submit"
                    style="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 self-end"
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
