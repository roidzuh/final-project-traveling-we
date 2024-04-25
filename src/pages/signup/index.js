import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import { loginImage } from "@/utils/data";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import { registerUser } from "@/utils/api";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Spinners from "@/components/Spinners";
import Head from "next/head";

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulasi loading halaman
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !passwordRepeat ||
      !phoneNumber
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    if (password !== passwordRepeat) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    const name = `${firstName} ${lastName}`;
    const profilePictureUrl = "https://placehold.co/100x100";
    const role = "admin";

    try {
      setIsLoading(true);
      const response = await registerUser({
        name,
        email,
        password,
        passwordRepeat,
        role,
        profilePictureUrl,
        phoneNumber,
      });
      if (response.error) {
        throw new Error(response.message);
      }
      toast.success("Registration successful", {
        autoClose: 2000,
      });
      setTimeout(() => {
        router.replace("/login");
      }, 3000);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

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

  if (isPageLoading) {
    return <Spinners />;
  }

  return (
    <>
      <Head>
        <title>TravelGo </title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="tw-bg-gray-50 tw-min-h-screen tw-flex tw-items-center tw-justify-center">
        <div className="tw-bg-gray-100 tw-flex tw-rounded-2xl tw-shadow-lg tw-max-w-4xl tw-p-3">
          <div className="md:tw-w-1/2 ">
            <h1 className="tw-text-2xl tw-font-bold tw-text-gray-800 ">
              TravelGo
            </h1>
            <form
              className="tw-flex tw-flex-col tw-gap-3 tw-px-6 tw-mt-4"
              onSubmit={handleSubmit}
            >
              <p className="tw-text-black tw-font-bold">Register</p>
              <div className="tw-flex tw-gap-4">
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  style="tw-w-1/2"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  style="tw-w-1/2"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
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
              <Input
                type="password"
                name="passwordRepeat"
                placeholder="Confirm Password"
                value={passwordRepeat}
                onChange={(e) => setPasswordRepeat(e.target.value)}
              />
              <Input
                type="number"
                name="phoneNumber"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <Button
                title="Register"
                type="submit"
                style={"tw-bg-blue-500 hover:tw-bg-blue-700 tw-text-white"}
                isLoading={isLoading}
              />
              <p className="tw-text-gray-700 tw-text-sm">
                Do you have an account? <Link href="/login">Login</Link>
              </p>
            </form>
            <p className="tw-text-gray-400 tw-text-xs tw-mt-6">
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
    </>
  );
}
