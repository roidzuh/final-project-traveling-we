import { useSelector, useDispatch } from "react-redux";
import { setIsOpen } from "@/features/slices/navbarSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import { EffectCreative, Autoplay } from "swiper/modules";

export default function Hero({ banners }) {
  const dispatch = useDispatch();
  return (
    <div>
      <Swiper
        grabCursor={false}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-20%", 0, -1],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[EffectCreative, Autoplay]}
        className="mx-[100px] my-auto w-[100%] h-screen"
        onClick={() => dispatch(setIsOpen(false))}
      >
        {banners.map((banner) => (
          <SwiperSlide
            key={banner.id}
            className="flex items-center justify-center "
          >
            <img
              src={banner.imageUrl}
              alt={banner.name}
              className="object-cover w-full h-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
