import Link from "next/link";
import ButtonLink from "./ButtonLink";

export default function Activity({ activities }) {
  return (
    <div className="tw-bg-slate-200 tw-p-4 tw-text-gray-600 tw-px-4 sm:tw-px-6 lg:tw-px-8 tw-py-6 sm:tw-py-8 lg:tw-py-10">
      <h2 className="tw-text-xl tw-font-semibold tw-mb-4">
        Explore Activities
      </h2>
      <p className="tw-mb-4">
        Discover the latest activities in the world of technology and
        innovation.
      </p>
      <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-4">
        {activities.slice(0, 6).map((activity) => (
          <Link
            key={activity.id}
            href={`/activity/${activity.id}`}
            className="tw-bg-gray-100 tw-rounded-lg tw-shadow-md tw-relative tw-no-underline tw-text-gray-600"
          >
            <img
              // tambah utils untuk memanggil gambar
              src={activity.imageUrls[1]}
              alt={activity.title}
              className="tw-w-full tw-h-48 tw-object-cover tw-rounded-t-md tw-mb-4"
            />
            <div className="tw-absolute tw-top-0 tw-left-0">
              <div className="tw-bg-cyan-500 tw-rounded-tl-md tw-rounded-br-md">
                <p className="tw-text-sm tw-font-semibold tw-text-white tw-p-2">
                  {activity.title}
                </p>
              </div>
              {/* dangersetinhtml untuk menampilkan googlemap */}
            </div>
            <div className="tw-p-4">
              <h3 className="tw-text-lg tw-font-semibold">{activity.title}</h3>
              <p>{activity.description}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="tw-mt-12 tw-text-center">
        <ButtonLink href="/activity" title="View All Activities" />
      </div>
    </div>
  );
}
