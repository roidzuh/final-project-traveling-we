// import { Card } from "react-bootstrap";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { useDispatch } from "react-redux";
import { setIsOpen } from "@/features/slices/navbarSlice";

export default function Banner({ banners }) {
  const dispatch = useDispatch();

  return (
    <div className="tw-bg-white tw-text-gray-600 tw-w-full tw-mb-16">
      <Swiper
        pagination={{
          type: "bullets",
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Autoplay]}
        className="mySwiper tw-h-full tw-w-full"
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        onClick={() => dispatch(setIsOpen())}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <img
              src={banner.imageUrl}
              alt={banner.name}
              className="tw-w-full tw-h-[550px] tw-object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
