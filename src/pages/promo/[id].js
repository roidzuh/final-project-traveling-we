import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchPromoById } from "../../utils/api";
import MainLayout from "@/layout/MainLayout";

export default function PromoDetail() {
  const [promo, setPromo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetchPromoById(id).then((data) => {
        setPromo(data.data);
        setIsLoading(false);
      });
    }
  }, [id]);

  return (
    <MainLayout>
      <div className="tw-container tw-mx-auto tw-my-16 tw-p-5 tw-min-h-screen ">
        {isLoading ? (
          <div className="tw-container tw-mx-auto tw-my-16 tw-p-5 tw-flex tw-justify-center tw-items-center">
            <div>Loading...</div>
          </div>
        ) : (
          <div className="md:tw-flex tw-no-wrap md:tw-mx-2">
            <div className="tw-w-full md:tw-w-3/12 md:tw-mx-2">
              <div className="tw-bg-white tw-p-3 tw-border-t-4 tw-border-green-400">
                <div className="tw-image tw-overflow-hidden">
                  <img
                    className="tw-h-auto tw-w-full tw-mx-auto tw-rounded-md"
                    src={promo.imageUrl}
                    alt={promo.title}
                  />
                </div>
                <h1 className="tw-text-gray-900 tw-font-bold tw-text-xl tw-my-1">
                  {promo.title}
                </h1>
                <ul className="tw-bg-gray-100 tw-text-gray-600 hover:tw-text-gray-700 hover:tw-shadow tw-py-2 tw-px-3 tw-mt-3 tw-rounded tw-shadow-sm">
                  <li className="tw-flex tw-items-center tw-py-3">
                    <span>Status</span>
                    <span className="tw-ml-auto">
                      <span className="tw-bg-green-500 tw-py-1 tw-px-2 tw-rounded"></span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="tw-w-full md:tw-w-9/12 tw-mx-2">
              <div className="tw-bg-white tw-p-3 tw-shadow-sm tw-rounded-sm">
                <div className="tw-flex tw-items-center tw-space-x-2 tw-font-semibold tw-text-gray-900">
                  <span className="tw-tracking-wide">About</span>
                </div>
                <div className="tw-text-gray-700">
                  <div className="tw-grid md:tw-grid-cols-2 tw-text-sm tw-gap-4">
                    <div className="tw-grid tw-grid-cols-2">
                      <div className="tw-px-4 tw-py-2 tw-font-semibold">
                        Title
                      </div>
                      <div className="tw-px-4 tw-py-2">{promo.title}</div>
                    </div>
                    <div className="tw-grid tw-grid-cols-2">
                      <div className="tw-px-4 tw-py-2 tw-font-semibold">
                        Description
                      </div>
                      <div className="tw-px-4 tw-py-2">{promo.description}</div>
                    </div>
                    <div className="tw-grid tw-grid-cols-2">
                      <div className="tw-px-4 tw-py-2 tw-font-semibold">
                        Terms and Conditions
                      </div>
                      <div className="tw-px-4 tw-py-2">
                        {promo.terms_condition}
                      </div>
                    </div>
                    <div className="tw-grid tw-grid-cols-2">
                      <div className="tw-px-4 tw-py-2 tw-font-semibold">
                        Promo Code
                      </div>
                      <div className="tw-px-4 tw-py-2">{promo.promo_code}</div>
                    </div>
                    <div className="tw-grid tw-grid-cols-2">
                      <div className="tw-px-4 tw-py-2 tw-font-semibold">
                        Promo Discount Price
                      </div>
                      <div className="tw-px-4 tw-py-2">
                        {promo.promo_discount_price}
                      </div>
                    </div>
                    <div className="tw-grid tw-grid-cols-2">
                      <div className="tw-px-4 tw-py-2 tw-font-semibold">
                        Minimum Claim Price
                      </div>
                      <div className="tw-px-4 tw-py-2">
                        {promo.minimum_claim_price}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
