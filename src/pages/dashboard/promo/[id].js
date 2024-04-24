import AdminLayout from "@/layout/AdminLayout";

export default function PromoDetail() {
  return (
    <AdminLayout>
      <div className="tw-flex tw-flex-col tw-items-center tw-mt-10">
        <div className="tw-p-8 tw-bg-white tw-rounded-xl tw-w-full tw-max-w-5xl tw-shadow-xl tw-border tw-border-gray-200">
          <h1 className="tw-text-4xl tw-font-extrabold tw-mb-8 tw-text-center tw-text-blue-700">
            Detail Promo
          </h1>
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-8">
            <div className="tw-col-span-2">
              <h2 className="tw-text-2xl tw-font-bold">Judul Promo</h2>
              <p className="tw-mt-3 tw-text-gray-800">
                Ini adalah detail dari promo yang dipilih.
              </p>
            </div>
            <div className="tw-col-span-1">
              <h3 className="tw-text-xl tw-font-bold">Kode Promo:</h3>
              <p className="tw-mt-3 tw-text-gray-800">PROMO123</p>
            </div>
            <div className="tw-col-span-1">
              <h3 className="tw-text-xl tw-font-bold">Diskon:</h3>
              <p className="tw-mt-3 tw-text-gray-800">50%</p>
            </div>
            <div className="tw-col-span-2">
              <h3 className="tw-text-xl tw-font-bold">Syarat dan Ketentuan:</h3>
              <p className="tw-mt-3 tw-text-gray-800">
                Syarat dan ketentuan berlaku.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
