import Link from "next/link";
import ButtonLink from "./ButtonLink";
import { FaStar, FaLocationDot } from "react-icons/fa6";

export default function Activity({ activities }) {
  return (
    <div className="tw-bg-slate-200 tw-p-4 tw-text-gray-800 tw-px-4 sm:tw-px-6 lg:tw-px-8 tw-py-6 sm:tw-py-8 lg:tw-py-10 tw-rounded-lg tw-shadow-lg">
      <h2 className="tw-text-2xl tw-font-bold tw-mb-4 tw-text-center">
        Explore Activities
      </h2>
      <p className="tw-mb-4 tw-text-center">
        Discover the latest activities in the world of technology and
        innovation.
      </p>
      <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-4">
        {activities?.slice(0, 6).map((activity) => (
          <Link
            key={activity.id}
            href={`/activity/${activity.id}`}
            className="tw-bg-white tw-rounded-lg tw-shadow-md tw-relative tw-no-underline tw-text-gray-800 tw-border tw-border-gray-300 hover:tw-shadow-lg"
          >
            <img
              src={activity?.imageUrls || "https://placehold.co/600x400"}
              alt={activity.title}
              className="tw-w-full tw-h-48 tw-object-cover tw-rounded-t-lg"
            />
            <div className="tw-absolute tw-top-0 tw-left-0 tw-bg-blue-500 tw-rounded-tl-lg tw-rounded-br-lg">
              <p className="tw-text-sm tw-font-semibold tw-text-white tw-p-2 tw-m-0">
                {activity.title}
              </p>
            </div>
            <div className="tw-p-4">
              <h3 className="tw-text-lg tw-font-semibold">{activity.title}</h3>
              <div className="tw-flex tw-items-center tw-mb-2">
                <FaLocationDot className="tw-text-red-500 tw-mr-2" />
                <p className="tw-m-0">{activity.address}</p>
              </div>
              <div className="tw-flex tw-items-center tw-mb-2">
                <FaStar className="tw-text-yellow-500 tw-mr-2" />
                <p className="tw-m-0">
                  {activity.rating} ({activity.total_reviews} reviews)
                </p>
              </div>
              <div className="tw-flex tw-justify-between tw-items-center">
                <p className="tw-line-through tw-text-gray-500">
                  IDR {activity.price}
                </p>
                <p className="tw-font-bold tw-text-lg">
                  IDR {activity.price_discount}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="tw-mt-12 tw-text-center">
        <ButtonLink
          href="/activity"
          title="View All Activities"
          className="tw-bg-blue-500 tw-text-white tw-font-bold tw-rounded-lg tw-px-6 tw-py-2 hover:tw-bg-blue-600"
        />
      </div>
    </div>
  );
}
