import { useState, useEffect } from "react";
import MainLayout from "@/layout/MainLayout";
import { fetchPromo } from "../../utils/api";
import Link from "next/link";

export default function PromoPage() {
  const [promos, setPromos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPromo().then((data) => {
      setPromos(data.data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="tw-container tw-mx-auto tw-my-12 tw-p-5 tw-min-h-screen tw-flex tw-justify-center tw-items-center">
          <div>Loading...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="tw-container tw-mx-auto tw-my-24 tw-p-5 tw-min-h-screen">
        <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 tw-gap-4">
          {promos.map((promo) => (
            <Link
              key={promo.id}
              href={`/promo/${promo.id}`}
              className="tw-bg-white tw-rounded-lg tw-shadow tw-overflow-hidden tw-no-underline tw-text-gray-600"
            >
              <img
                src={promo.imageUrl}
                alt={promo.title}
                className="tw-w-full tw-h-48 tw-object-cover"
              />
              <div className="tw-p-4">
                <h3 className="tw-text-lg tw-font-semibold">{promo.title}</h3>
                <p>{promo.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
