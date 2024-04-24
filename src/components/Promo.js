import Slider from "react-slick";
import ButtonLink from "./ButtonLink";
import Link from "next/link";

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
    <div className="tw-mt-96 tw-py-4 tw-px-16 tw-bg-slate-200 tw-text-gray-600 tw-mb-16 tw-rounded-md">
      <h2 className="tw-text-2xl tw-font-bold tw-mb-4 tw-text-center">
        Best Promotions
      </h2>
      <p className="tw-mb-4 tw-text-center">
        Get the best deals for your vacation
      </p>
      <Slider {...settings}>
        {promos.map((promo) => (
          <Link
            key={promo.id}
            href={`/promo/${promo.id}`}
            className="tw-px-4 tw-py-4 tw-bg-transparent"
          >
            <div className="tw-relative tw-group tw-w-full tw-h-60">
              <img
                src={promo.imageUrl}
                alt={promo.title}
                className="tw-w-full tw-h-full tw-object-cover tw-rounded-md"
              />
              <div className="tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-bg-black tw-bg-opacity-50 tw-text-white tw-p-2 tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity tw-duration-300">
                <h3 className="tw-text-lg tw-font-semibold tw-opacity-100">
                  {promo.title}
                </h3>
                <div className="tw-opacity-0 group-hover:tw-opacity-100">
                  <p className="tw-text-sm tw-mb-2">
                    Promo Code: {promo.promo_code}
                  </p>
                  <p className="tw-text-sm tw-mb-2">
                    Discount: IDR {promo.promo_discount_price}
                  </p>
                  <p className="tw-text-sm">
                    Minimum Purchase: IDR {promo.minimum_claim_price}
                  </p>
                  <p className="tw-text-xs tw-mt-2 tw-italic">
                    {promo.terms_condition}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </Slider>
      <div className="tw-mt-12 tw-text-center">
        <ButtonLink href="/promo" title="View All Promotions" />
      </div>
    </div>
  );
}
