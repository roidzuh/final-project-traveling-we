import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import { loginImage } from "@/utils/data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function LoginPage() {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5">
        <div className="sm:w-1/2 ">
          <h1 className="text-2xl font-bold ">Travelo</h1>
          <form className="flex flex-col gap-4 px-16 mt-20">
            <p className="text-black font-bold">Login</p>
            <Input type="email" name="email" placeholder="Email" />
            <Input type="password" name="password" placeholder="Password" />
            <Button
              title="Login"
              type="submit"
              style={"bg-gray-300 hover:bg-gray-400"}
            />
            <p className="text-gray-700 text-sm">
              Do not have an account? <Link href="/signup">Create one</Link>
            </p>
          </form>
          <p className="text-gray-400 text-xs mt-28">
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
