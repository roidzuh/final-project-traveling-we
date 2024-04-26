import Button from "@/components/Button";
import Input from "@/components/Input";
import AdminLayout from "@/layout/AdminLayout";
import { fetchUser, uploadImage, updateProfile } from "@/utils/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinners from "@/components/Spinners";

export default function ProfilePageDashboard() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    profilePictureUrl: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
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
      setIsLoading(false);
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
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!profile.name || !profile.email || !profile.phoneNumber) {
      toast.error("Please fill in all fields.");
      return;
    }
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await updateProfile(profile, token);
      if (response.error) {
        toast.error(response.message);
      } else {
        localStorage.setItem("user", JSON.stringify(profile));
        toast.success("Profile updated successfully.");
        window.location.reload();
      }
    } catch (error) {
      toast.error("Failed to update profile.");
    }
    setIsLoading(false);
  };

  return (
    <AdminLayout>
      {isLoading ? (
        <Spinners />
      ) : (
        <div className="tw-w-full tw-bg-slate-100 tw-h-[calc(100vh-10rem)] tw-min-h-[750px] tw-rounded-xl tw-p-4 tw-md:tw-p-8">
          <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-8 tw-items-center tw-justify-center">
            <div className="tw-text-center">
              <img
                src={profile.profilePictureUrl}
                alt={profile.name}
                className="tw-w-44 lg:tw-w-full tw-max-w-xs tw-h-44 lg:tw-h-auto tw-rounded-xl tw-mx-auto"
              />
              <div className="tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-justify-center tw-gap-4 tw-mt-4">
                <Input
                  type="file"
                  onChange={handleFileChange}
                  style="tw-border-gray-300 tw-py-2 tw-px-3 file:tw-mr-4 file:tw-py-2 file:tw-px-4 file:tw-rounded-lg file:tw-border-0 file:tw-text-white file:tw-bg-blue-500 file:tw-cursor-pointer file:hover:tw-bg-blue-600"
                />
                <Button
                  title="Update image"
                  style={"tw-bg-blue-500 tw-text-white hover:tw-bg-blue-700"}
                  onClick={handleImageUpload}
                />
              </div>
            </div>
            <form
              className="tw-flex tw-flex-col tw-gap-6"
              onSubmit={handleProfileUpdate}
            >
              <div className="tw-flex tw-flex-col tw-gap-2">
                <label className="tw-font-semibold">Name</label>
                <Input
                  placeholder="Name"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  style="tw-border-gray-300 focus:tw-border-blue-500"
                />
              </div>
              <div className="tw-flex tw-flex-col tw-gap-2">
                <label className="tw-font-semibold tw-text-gray-700">
                  Email
                </label>
                <Input
                  placeholder="Email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  style="tw-border-gray-300 focus:tw-border-blue-500"
                />
              </div>
              <div className="tw-flex tw-flex-col tw-gap-2">
                <label className="tw-font-semibold tw-text-gray-700">
                  Phone Number
                </label>
                <Input
                  placeholder="Phone Number"
                  name="phoneNumber"
                  value={profile.phoneNumber}
                  onChange={handleInputChange}
                  style="tw-border-gray-300 focus:tw-border-blue-500"
                />
              </div>
              <Button
                title="Update Profile"
                style="tw-bg-blue-600 tw-text-white hover:tw-bg-blue-800"
                type="submit"
              />
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
