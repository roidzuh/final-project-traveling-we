import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import { loginImage } from "@/utils/data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function SignUpPage() {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5">
        <div className="sm:w-1/2 ">
          <h1 className="text-2xl font-bold ">Travelo</h1>
          <form className="flex flex-col gap-3 px-6 mt-4">
            <p className="text-black font-bold">Register</p>
            <div className="flex gap-4">
              <Input
                type="text"
                name="firstName"
                placeholder="First Name"
                style="w-1/2"
              />
              <Input
                type="text"
                name="lastName"
                placeholder="Last Name"
                style="w-1/2"
              />
            </div>
            <Input type="email" name="email" placeholder="Email" />
            <Input type="password" name="password" placeholder="Password" />
            <Input
              type="password"
              name="passwordRepeat"
              placeholder="Confirm Password"
            />
            <Input
              type="number"
              name="phoneNumber"
              placeholder="Phone Number"
            />
            <Input
              type="file"
              name="profilePictureUrl"
              placeholder="Profile Picture"
            />
            <Button
              title="Register"
              type="submit"
              style={"bg-gray-300 hover:bg-gray-400"}
            />
            <p className="text-gray-700 text-sm">
              Do you have an account? <Link href="/login">Login</Link>
            </p>
          </form>
          <p className="text-gray-400 text-xs mt-6">
            Copyright © 2024 Travelo. All rights reserved.
          </p>
        </div>
        <div className="sm:block hidden w-1/2 ">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            modules={[Autoplay, Pagination]}
            className="w-[100%] h-[100%]"
          >
            {loginImage.map((image) => (
              <SwiperSlide key={image.id}>
                <img
                  src={image.image}
                  alt={image.title}
                  className="flex items-center justify-center w-full h-full object-cover rounded-3xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
