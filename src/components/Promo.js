import { useDispatch } from "react-redux";
import { setIsOpen } from "@/features/slices/navbarSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import ButtonLink from "./ButtonLink";

export default function Promo({ promos }) {
  const dispatch = useDispatch();
  return (
    <div className="tw-mt-96 tw-p-4 tw-bg-slate-200 tw-text-gray-600 tw-mb-16">
      <h2 className="tw-text-xl tw-font-semibold tw-mb-4">Promo</h2>
      <p className="tw-mb-4">Best holiday deals</p>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
        onClick={() => dispatch(setIsOpen())}
      >
        {promos.map((promo) => (
          <SwiperSlide key={promo.id}>
            <img
              src={promo.imageUrl}
              alt={promo.title}
              className="tw-w-full tw-h-60 tw-object-cover tw-rounded-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="tw-mt-12 tw-text-center">
        <ButtonLink href="/promo" title="View All Promo" />
      </div>
    </div>
  );
}
