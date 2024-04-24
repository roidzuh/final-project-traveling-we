import Input from "./Input";

export default function CategoryForm({ selectedCategory, onInputChange }) {
  return (
    <>
      <div className="tw-font-bold tw-flex tw-flex-col">
        <label>Name</label>
        <Input
          name="name"
          type="text"
          placeholder="Category Name"
          value={selectedCategory?.name || ""}
          onChange={onInputChange}
        />
      </div>
      <div>
        <label className="tw-font-bold tw-flex tw-flex-col">
          New Image File
        </label>
        <Input name="imageFile" type="file" onChange={onInputChange} />
      </div>
    </>
  );
}
