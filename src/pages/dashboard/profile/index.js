import Button from "@/components/Button";
import Input from "@/components/Input";
import AdminLayout from "@/layout/AdminLayout";
import { fetchUser, uploadImage, updateProfile } from "@/utils/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ProfilePageDashboard() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    profilePictureUrl: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getProfile = async () => {
      try {
        const fetchedProfile = await fetchUser(token);
        setProfile(
          fetchedProfile?.data || {
            name: "",
            email: "",
            phoneNumber: "",
            profilePictureUrl: "",
          }
        );
      } catch (error) {
        toast.error("Failed to fetch profile.");
      }
    };
    getProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first.");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      const response = await uploadImage(selectedFile, token);
      if (response.error) {
        toast.error(response.message);
      } else {
        setProfile((prevState) => ({
          ...prevState,
          profilePictureUrl: response.url,
        }));
        toast.success("Image uploaded successfully.");
      }
    } catch (error) {
      toast.error("Failed to upload image.");
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await updateProfile(profile, token);
      if (response.error) {
        toast.error(response.message);
      } else {
        localStorage.setItem("user", JSON.stringify(profile));
        toast.success("Profile updated successfully.");
        window.location.reload(); // Menambahkan baris ini untuk reload halaman setelah berhasil update
      }
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  return (
    <AdminLayout>
      <div className="w-full bg-slate-100 h-[calc(100vh-10rem)] min-h-[600px] rounded-xl p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center justify-center">
          <div className="text-center">
            <img
              src={profile.profilePictureUrl}
              alt={profile.name}
              className="w-full max-w-xs h-auto rounded-xl mx-auto"
            />
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-4">
              <Input type="file" onChange={handleFileChange} />
              <Button
                title="Update image"
                style={"bg-blue-500 text-white hover:bg-blue-700"}
                onClick={handleImageUpload}
              />
            </div>
          </div>
          <form className="flex flex-col gap-6" onSubmit={handleProfileUpdate}>
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Name</label>
              <Input
                placeholder="Name"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                style="border-gray-300 focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-700">Email</label>
              <Input
                placeholder="Email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                style="border-gray-300 focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-700">
                Phone Number
              </label>
              <Input
                placeholder="Phone Number"
                name="phoneNumber"
                value={profile.phoneNumber}
                onChange={handleInputChange}
                style="border-gray-300 focus:border-blue-500"
              />
            </div>
            <Button
              title="Update Profile"
              style="bg-blue-600 text-white hover:bg-blue-800"
              type="submit"
            />
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
