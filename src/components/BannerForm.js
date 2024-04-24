import Input from "./Input";

export default function BannerForm({ selectedBanner, onInputChange }) {
  return (
    <>
      <div className="tw-font-bold tw-flex tw-flex-col">
        <label>Name</label>
        <Input
          name="name"
          type="text"
          placeholder="Banner Name"
          value={selectedBanner?.name || ""}
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
