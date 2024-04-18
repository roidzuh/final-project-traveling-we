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
    <div className="absolute w-full ">
      <div className="relative bottom-64 text-center">
        <div className="pb-4 text-slate-200">
          <h2>Popular Destinations</h2>
          <p>&quot;Find your best experience&quot;</p>
        </div>
        <div className="px-4 md:px-16 lg:px-16 ">
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
              <SwiperSlide key={category.id} className="group">
                <div className="relative">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-96 object-cover rounded-xl group-hover:blur-sm transition duration-300 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out rounded-xl">
                    <span className="text-white text-lg">{category.name}</span>
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
