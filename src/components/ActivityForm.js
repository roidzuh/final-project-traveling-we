import Input from "./Input";

export default function ActivityForm({
  selectedActivity,
  onInputChange,
  categories,
}) {
  return (
    <>
      <div className="tw-font-bold tw-flex tw-flex-col tw-text-sm sm:tw-text-base md:tw-text-lg">
        <label htmlFor="categoryId">Category</label>
        <select
          id="categoryId"
          name="categoryId"
          value={selectedActivity?.categoryId || ""}
          onChange={onInputChange}
          className="tw-border tw-rounded tw-py-2 tw-px-3 tw-mb-4 tw-w-full"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="tw-font-bold tw-flex tw-flex-col tw-text-sm sm:tw-text-base md:tw-text-lg">
        <label htmlFor="title">Title</label>
        <Input
          name="title"
          type="text"
          placeholder="Title"
          value={selectedActivity?.title || ""}
          onChange={onInputChange}
          style="tw-w-full"
        />
      </div>
      <div className="tw-font-bold tw-flex tw-flex-col tw-text-sm sm:tw-text-base md:tw-text-lg">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className="tw-p-2 tw-rounded-xl tw-border tw-py-2 tw-px-3 tw-w-full"
          placeholder="Description"
          value={selectedActivity?.description || ""}
          onChange={onInputChange}
        ></textarea>
      </div>
      <div className="tw-font-bold tw-flex tw-flex-col tw-text-sm sm:tw-text-base md:tw-text-lg">
        <label htmlFor="price">Price</label>
        <Input
          name="price"
          type="number"
          placeholder="Price"
          value={selectedActivity?.price || ""}
          onChange={onInputChange}
          min="0"
          style="tw-w-full"
        />
      </div>
      <div className="tw-font-bold tw-flex tw-flex-col tw-text-sm sm:tw-text-base md:tw-text-lg">
        <label htmlFor="price_discount">Price Discount</label>
        <Input
          name="price_discount"
          type="number"
          placeholder="Price Discount"
          value={selectedActivity?.price_discount || ""}
          onChange={onInputChange}
          min="0"
          style="tw-w-full"
        />
      </div>
      <div className="tw-font-bold tw-flex tw-flex-col tw-text-sm sm:tw-text-base md:tw-text-lg">
        <label htmlFor="rating">Rating</label>
        <Input
          name="rating"
          type="number"
          placeholder="Rating"
          value={selectedActivity?.rating || ""}
          onChange={onInputChange}
          min="0"
          style="tw-w-full"
        />
      </div>
      <div className="tw-font-bold tw-flex tw-flex-col tw-text-sm sm:tw-text-base md:tw-text-lg">
        <label htmlFor="total_reviews">Total Reviews</label>
        <Input
          name="total_reviews"
          type="number"
          placeholder="Total Reviews"
          value={selectedActivity?.total_reviews || ""}
          onChange={onInputChange}
          min="0"
          style="tw-w-full"
        />
      </div>
      <div className="tw-font-bold tw-flex tw-flex-col tw-text-sm sm:tw-text-base md:tw-text-lg">
        <label htmlFor="facilities">Facilities</label>
        <Input
          name="facilities"
          type="text"
          placeholder="Facilities"
          value={selectedActivity?.facilities || ""}
          onChange={onInputChange}
          style="tw-w-full"
        />
      </div>
      <div className="tw-font-bold tw-flex tw-flex-col tw-text-sm sm:tw-text-base md:tw-text-lg">
        <label htmlFor="address">Address</label>
        <Input
          name="address"
          type="text"
          placeholder="Address"
          value={selectedActivity?.address || ""}
          onChange={onInputChange}
          style="tw-w-full"
        />
      </div>
      <div className="tw-font-bold tw-flex tw-flex-col tw-text-sm sm:tw-text-base md:tw-text-lg">
        <label htmlFor="province">Province</label>
        <Input
          name="province"
          type="text"
          placeholder="Province"
          value={selectedActivity?.province || ""}
          onChange={onInputChange}
          style="tw-w-full"
        />
      </div>
      <div className="tw-font-bold tw-flex tw-flex-col tw-text-sm sm:tw-text-base md:tw-text-lg">
        <label htmlFor="city">City</label>
        <Input
          name="city"
          type="text"
          placeholder="City"
          value={selectedActivity?.city || ""}
          onChange={onInputChange}
          style="tw-w-full"
        />
      </div>
      <div className="tw-font-bold tw-flex tw-flex-col tw-text-sm sm:tw-text-base md:tw-text-lg">
        <label htmlFor="location_maps">Location Map</label>
        <Input
          name="location_maps"
          type="text"
          placeholder="Location Map"
          value={selectedActivity?.location_maps || ""}
          onChange={onInputChange}
          style="tw-w-full"
        />
      </div>
      <div className="tw-font-bold tw-flex tw-flex-col tw-text-sm sm:tw-text-base md:tw-text-lg">
        <label htmlFor="image">Image</label>
        <Input
          name="image"
          type="file"
          onChange={onInputChange}
          style="tw-border-gray-300 tw-py-2 tw-px-3 file:tw-mr-4 file:tw-py-2 file:tw-px-4 file:tw-rounded-lg file:tw-border-0 file:tw-text-white file:tw-bg-blue-500 file:tw-cursor-pointer file:hover:tw-bg-blue-600 tw-w-full"
        />
      </div>
    </>
  );
}
