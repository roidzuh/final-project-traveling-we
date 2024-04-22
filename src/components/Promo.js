import Slider from "react-slick";
import ButtonLink from "./ButtonLink";

export default function Promo({ promos }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="tw-mt-96 tw-p-4 tw-bg-slate-200 tw-text-gray-600 tw-mb-16">
      <h2 className="tw-text-xl tw-font-semibold tw-mb-4">Promo</h2>
      <p className="tw-mb-4">Best holiday deals</p>
      <Slider {...settings}>
        {promos.map((promo) => (
          <div key={promo.id}>
            <img
              src={promo.imageUrl}
              alt={promo.title}
              className="tw-w-full tw-h-60 tw-object-cover tw-rounded-md"
            />
          </div>
        ))}
      </Slider>
      <div className="tw-mt-12 tw-text-center">
        <ButtonLink href="/promo" title="View All Promo" />
      </div>
    </div>
  );
}
