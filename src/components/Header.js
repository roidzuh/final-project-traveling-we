import User from "./User";

export default function Header() {
  return (
    <div className="col-span-full flex justify-between">
      <h1 className="text-2xl mt-2 font-bold cursor-default">TravelGo</h1>
      <User />
    </div>
  );
}