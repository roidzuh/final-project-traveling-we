import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import { useDispatch } from "react-redux";
import { setIsOpen } from "@/features/slices/navbarSlice";

export default function Category({ categories }) {
  const dispatch = useDispatch();

  return (
    <div className="tw-absolute tw-w-full ">
      <div className="tw-relative tw-bottom-64 tw-text-center">
        <div className="tw-pb-4 tw-text-slate-200">
          <h2>Popular Destinations</h2>
          <p>&quot;Find your best experience&quot;</p>
        </div>
        <div className="tw-px-4 md:tw-px-16 lg:tw-px-16 ">
          <Swiper
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
            onClick={() => dispatch(setIsOpen())}
          >
            {categories?.map((category) => (
              <SwiperSlide key={category.id} className="tw-group">
                <div className="tw-relative">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="tw-w-full tw-h-96 tw-object-cover tw-rounded-xl group-hover:tw-blur-sm tw-transition tw-duration-300 tw-ease-in-out"
                  />
                  <div className="tw-absolute tw-inset-0 tw-bg-black tw-bg-opacity-0 group-hover:tw-bg-opacity-50 tw-flex tw-items-center tw-justify-center tw-opacity-0 group-hover:tw-opacity-100 tw-transition tw-duration-300 tw-ease-in-out tw-rounded-xl">
                    <span className="tw-text-white tw-text-lg">
                      {category.name}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
