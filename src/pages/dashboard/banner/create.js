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
      <div className="p-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2">
                Nama Banner:
              </label>
              <Input
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style="border p-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="image" className="block mb-2">
                Gambar Banner:
              </label>
              <Input
                type="file"
                name="image"
                style="border p-2 w-full"
                onChange={handleImageChange}
              />
            </div>
            <Button
              title="Create Banner"
              type="submit"
              style="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            />
          </form>
        )}
      </div>
    </AdminLayout>
  );
}
