import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import { loginImage } from "@/utils/data";
import Slider from "react-slick";
import { useState } from "react";
import { handleLogin } from "@/utils/api";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      setIsLoading(true);
      const response = await handleLogin(email, password);
      if (response.error) {
        throw new Error(response.message || "Login failed");
      }
      const token = response.token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(response.data));
      toast.success("Login successful", {
        autoClose: 2000,
      });
      setTimeout(() => {
        router.replace("/dashboard/users");
      }, 3000);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Pengaturan untuk Slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    prevArrow: <></>,
    nextArrow: <></>,
  };

  return (
    <div className="tw-bg-gray-50 tw-min-h-screen tw-flex tw-items-center tw-justify-center">
      <div className="tw-bg-gray-100 tw-flex tw-rounded-2xl tw-shadow-lg  tw-max-w-4xl tw-p-3">
        <div className="md:tw-w-1/2 ">
          <h1 className="tw-text-2xl tw-font-bold ">TravelGo</h1>
          <form
            className="tw-flex tw-flex-col tw-gap-4 tw-px-16 tw-mt-20"
            onSubmit={handleSubmitLogin}
          >
            <p className="tw-text-black tw-font-bold">Login</p>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              title="Login"
              type="submit"
              style="tw-bg-gray-300 hover:tw-bg-gray-400"
              isLoading={isLoading}
            />
            <p className="tw-text-gray-700 tw-text-sm">
              Do not have an account? <Link href="/signup">Create one</Link>
            </p>
          </form>
          <p className="tw-text-gray-400 tw-text-xs tw-mt-28">
            Copyright © 2024 TravelGo. All rights reserved.
          </p>
        </div>
        <div className="md:tw-block tw-hidden tw-w-1/2 ">
          <Slider {...settings}>
            {loginImage.map((image) => (
              <div key={image.id}>
                <img
                  src={image.image}
                  alt={image.title}
                  className="tw-flex tw-items-center tw-justify-center tw-w-full tw-h-[490px] tw-object-cover tw-rounded-3xl"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
