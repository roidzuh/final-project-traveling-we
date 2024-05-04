import Input from "./Input";

export default function PromoForm({ selectedPromo, onInputChange }) {
  return (
    <>
      <div className="tw-font-bold tw-flex tw-flex-col tw-text-sm sm:tw-text-base">
        <label htmlFor="title">Title</label>
        <Input
          name="title"
          type="text"
          placeholder="Promo Title"
          value={selectedPromo?.title || ""}
          onChange={onInputChange}
        />
      </div>
      <div className="tw-font-bold tw-flex tw-flex-col tw-text-sm sm:tw-text-base">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className="tw-p-2 tw-rounded-xl tw-border tw-py-2 tw-px-3"
          placeholder="Promo Description"
          value={selectedPromo?.description || ""}
          onChange={onInputChange}
        ></textarea>
      </div>

      <div className="tw-font-bold tw-flex tw-flex-col tw-text-sm sm:tw-text-base">
        <label htmlFor="terms_condition">Terms & Conditions</label>
        <Input
          name="terms_condition"
          type="text"
          placeholder="Terms & Conditions"
          value={selectedPromo?.terms_condition || ""}
          onChange={onInputChange}
        />
      </div>
      <div className="tw-font-bold tw-flex tw-flex-col tw-text-sm sm:tw-text-base">
        <label htmlFor="promo_code">Promo Code</label>
        <Input
          name="promo_code"
          type="text"
          placeholder="Promo Code"
          value={selectedPromo?.promo_code || ""}
          onChange={onInputChange}
        />
      </div>
      <div className="tw-font-bold tw-flex tw-flex-col tw-text-sm sm:tw-text-base">
        <label htmlFor="promo_discount_price">Promo Discount Price</label>
        <Input
          name="promo_discount_price"
          type="number"
          placeholder="Promo Discount Price"
          value={selectedPromo?.promo_discount_price || ""}
          onChange={onInputChange}
          min="0"
        />
      </div>
      <div className="tw-font-bold tw-flex tw-flex-col tw-text-sm sm:tw-text-base">
        <label htmlFor="minimum_claim_price">Minimum Claim Price</label>
        <Input
          name="minimum_claim_price"
          type="number"
          placeholder="Minimum Claim Price"
          value={selectedPromo?.minimum_claim_price || ""}
          onChange={onInputChange}
          min="0"
        />
      </div>
      <div className="tw-font-bold tw-flex tw-flex-col tw-text-sm sm:tw-text-base">
        <label htmlFor="imageUrl">Image URL</label>
        <Input
          name="imageUrl"
          type="file"
          placeholder="Promo Image URL"
          onChange={onInputChange}
          style="tw-border-gray-300 tw-py-2 tw-px-3 file:tw-mr-4 file:tw-py-2 file:tw-px-4 file:tw-rounded-lg file:tw-border-0 file:tw-text-white file:tw-bg-blue-500 file:tw-cursor-pointer file:hover:tw-bg-blue-600"
        />
      </div>
    </>
  );
}
