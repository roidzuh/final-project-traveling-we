import User from "./User";

export default function Header() {
  return (
    <div className="tw-col-span-full tw-flex tw-justify-between tw-items-center tw-mt-10">
      <h1 className="tw-text-2xl tw-font-bold tw-cursor-default">TravelGo</h1>
      <User />
    </div>
  );
}
