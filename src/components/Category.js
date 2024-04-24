import Slider from "react-slick";

export default function Category({ categories }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: <></>,
    nextArrow: <></>,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
  };

  return (
    <div className="tw-absolute tw-w-full ">
      <div className="tw-relative tw-bottom-64 tw-text-center">
        <div className="tw-pb-4 tw-text-slate-200">
          <h2>Popular Destinations</h2>
          <p>&quot;Find your best experience&quot;</p>
        </div>
        <div className="tw-px-4 md:tw-px-16 lg:tw-px-16 ">
          <Slider {...settings}>
            {categories?.map((category) => (
              <div key={category.id} className="tw-group tw-px-4">
                <div className="tw-relative">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="tw-w-full tw-h-96 tw-object-cover tw-rounded-xl group-hover:tw-blur-sm tw-transition tw-duration-300 tw-ease-in-out"
                  />
                  <div className="tw-absolute tw-inset-0 tw-bg-black tw-bg-opacity-0 group-hover:tw-bg-opacity-50 tw-flex tw-items-center tw-justify-center tw-opacity-0 group-hover:tw-opacity-100 tw-transition tw-duration-300 tw-ease-in-out tw-rounded-xl">
                    <span className="tw-text-white tw-text-xl tw-font-bold">
                      {category.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
