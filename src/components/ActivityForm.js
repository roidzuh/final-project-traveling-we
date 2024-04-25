import Input from "./Input";

export default function ActivityForm({
  selectedActivity,
  onInputChange,
  categories,
}) {
  return (
    <>
      <div className="tw-font-bold tw-flex tw-flex-col">
        <label>Category</label>
        <select
          name="categoryId"
          value={selectedActivity?.categoryId || ""}
          onChange={onInputChange}
          className="tw-border tw-rounded tw-py-2 tw-px-3 tw-mb-4"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="tw-font-bold tw-flex tw-flex-col">
        <label>Title</label>
        <Input
          name="title"
          type="text"
          placeholder="Title"
          value={selectedActivity?.title || ""}
          onChange={onInputChange}
        />
      </div>
      <div className="tw-font-bold tw-flex tw-flex-col">
        <label>Description</label>
        <Input
          name="description"
          type="text"
          placeholder="Description"
          value={selectedActivity?.description || ""}
          onChange={onInputChange}
        />
      </div>
      <div className="tw-font-bold tw-flex tw-flex-col">
        <label>Price</label>
        <Input
          name="price"
          type="number"
          placeholder="Price"
          value={selectedActivity?.price || ""}
          onChange={onInputChange}
        />
      </div>
      <div className="tw-font-bold tw-flex tw-flex-col">
        <label>Price Discount</label>
        <Input
          name="price_discount"
          type="number"
          placeholder="Price Discount"
          value={selectedActivity?.price_discount || ""}
          onChange={onInputChange}
        />
      </div>
      <div className="tw-font-bold tw-flex tw-flex-col">
        <label>Rating</label>
        <Input
          name="rating"
          type="number"
          placeholder="Rating"
          value={selectedActivity?.rating || ""}
          onChange={onInputChange}
        />
      </div>
      <div className="tw-font-bold tw-flex tw-flex-col">
        <label>Total Reviews</label>
        <Input
          name="total_reviews"
          type="number"
          placeholder="Total Reviews"
          value={selectedActivity?.total_reviews || ""}
          onChange={onInputChange}
        />
      </div>
      <div className="tw-font-bold tw-flex tw-flex-col">
        <label>Facilities</label>
        <Input
          name="facilities"
          type="text"
          placeholder="Facilities"
          value={selectedActivity?.facilities || ""}
          onChange={onInputChange}
        />
      </div>
      <div className="tw-font-bold tw-flex tw-flex-col">
        <label>Address</label>
        <Input
          name="address"
          type="text"
          placeholder="Address"
          value={selectedActivity?.address || ""}
          onChange={onInputChange}
        />
      </div>
      <div className="tw-font-bold tw-flex tw-flex-col">
        <label>Province</label>
        <Input
          name="province"
          type="text"
          placeholder="Province"
          value={selectedActivity?.province || ""}
          onChange={onInputChange}
        />
      </div>
      <div className="tw-font-bold tw-flex tw-flex-col">
        <label>City</label>
        <Input
          name="city"
          type="text"
          placeholder="City"
          value={selectedActivity?.city || ""}
          onChange={onInputChange}
        />
      </div>
      <div className="tw-font-bold tw-flex tw-flex-col">
        <label>Location Map</label>
        <Input
          name="location_maps"
          type="text"
          placeholder="Location Map"
          value={selectedActivity?.location_maps || ""}
          onChange={onInputChange}
        />
      </div>
      <div className="tw-font-bold tw-flex tw-flex-col">
        <label>Image</label>
        <Input name="image" type="file" onChange={onInputChange} />
      </div>
    </>
  );
}
