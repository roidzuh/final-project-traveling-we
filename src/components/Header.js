import User from "./User";

export default function Header() {
  return (
    <div className="col-span-full flex justify-between items-center mt-10">
      <h1 className="text-2xl font-bold cursor-default">TravelGo</h1>
      <User />
    </div>
  );
}
