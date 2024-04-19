// import { Card } from "react-bootstrap";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

export default function Banner({ banners }) {
  return (
    <div className="bg-white text-gray-600 w-full">
      <Swiper
        pagination={{
          type: "bullets",
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Autoplay]}
        className="mySwiper h-full w-full"
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <img
              src={banner.imageUrl}
              alt={banner.name}
              className="w-full h-[550px] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
