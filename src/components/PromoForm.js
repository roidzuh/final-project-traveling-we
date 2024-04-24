import Input from "./Input";

export default function PromoForm({ selectedPromo, onInputChange }) {
  return (
    <>
      <div className="tw-font-bold tw-flex tw-flex-col">
        <label>Title</label>
        <Input
          name="title"
          type="text"
          placeholder="Promo Title"
          value={selectedPromo?.title || ""}
          onChange={onInputChange}
        />
      </div>
      <div className="tw-font-bold tw-flex tw-flex-col">
        <label>Description</label>
        <Input
          name="description"
          type="text"
          placeholder="Promo Description"
          value={selectedPromo?.description || ""}
          onChange={onInputChange}
        />
      </div>
      <div className="tw-font-bold tw-flex tw-flex-col">
        <label>Image URL</label>
        <Input
          name="imageUrl"
          type="file"
          placeholder="Promo Image URL"
          onChange={onInputChange}
        />
      </div>
      <div className="tw-font-bold tw-flex tw-flex-col">
        <label>Terms & Conditions</label>
        <Input
          name="terms_condition"
          type="text"
          placeholder="Terms & Conditions"
          value={selectedPromo?.terms_condition || ""}
          onChange={onInputChange}
        />
      </div>
      <div className="tw-font-bold tw-flex tw-flex-col">
        <label>Promo Code</label>
        <Input
          name="promo_code"
          type="text"
          placeholder="Promo Code"
          value={selectedPromo?.promo_code || ""}
          onChange={onInputChange}
        />
      </div>
      <div className="tw-font-bold tw-flex tw-flex-col">
        <label>Promo Discount Price</label>
        <Input
          name="promo_discount_price"
          type="number"
          placeholder="Promo Discount Price"
          value={selectedPromo?.promo_discount_price || ""}
          onChange={onInputChange}
        />
      </div>
      <div className="tw-font-bold tw-flex tw-flex-col">
        <label>Minimum Claim Price</label>
        <Input
          name="minimum_claim_price"
          type="number"
          placeholder="Minimum Claim Price"
          value={selectedPromo?.minimum_claim_price || ""}
          onChange={onInputChange}
        />
      </div>
    </>
  );
}
