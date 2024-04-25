import Link from "next/link";
import Slider from "react-slick";

export default function Banner({ banners }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  return (
    <div
      className="tw-bg-white tw-text-gray-600 tw-w-full tw-mb-16 tw-mt-16"
      data-aos="fade-up"
    >
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id} className="tw-relative tw-group">
            <img
              src={banner.imageUrl}
              alt={banner.name}
              className="tw-w-full tw-h-[550px] tw-object-cover group-hover:tw-blur-sm"
            />
            <div className="tw-absolute tw-inset-0 tw-bg-black tw-bg-opacity-0 tw-flex tw-justify-center tw-items-center tw-opacity-0 group-hover:tw-bg-opacity-50 group-hover:tw-opacity-100 tw-transition tw-duration-300">
              <span className="tw-text-white tw-text-5xl tw-font-extrabold">
                {banner.name}
              </span>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
