import { useState } from "react";
import { useRouter } from "next/router";
import { uploadImage, createBanner } from "@/utils/api";
import AdminLayout from "@/layout/AdminLayout";
import { toast } from "react-toastify";

export default function CreateBanner() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
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

    try {
      const token = localStorage.getItem("token");
      const uploadResponse = await uploadImage(image, token);
      if (uploadResponse.error) {
        toast.error(uploadResponse.message || "Gagal mengupload gambar");
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
        toast.error(createResponse.message || "Gagal membuat banner");
        return;
      }

      toast.success("Banner berhasil dibuat");
      router.push("/dashboard/banner");
    } catch (error) {
      toast.error(error.response?.data?.message || "Terjadi kesalahan");
    }
  };

  return (
    <AdminLayout>
      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2">
              Nama Banner:
            </label>
            <input
              type="text"
              id="name"
              className="border p-2 w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="image" className="block mb-2">
              Gambar Banner:
            </label>
            <input
              type="file"
              id="image"
              className="border p-2 w-full"
              onChange={handleImageChange}
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Buat Banner
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
