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
    <div className="tw-bg-white tw-text-gray-600 tw-w-full tw-mb-16">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id}>
            <img
              src={banner.imageUrl}
              alt={banner.name}
              className="tw-w-full tw-h-[550px] tw-object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
