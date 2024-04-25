import User from "./User";
import ButtonIcon from "./ButtonIcon";
import { useDispatch, useSelector } from "react-redux";
import { toggleFull } from "../features/slices/sidebarSlice";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";

export default function Header() {
  const isFull = useSelector((state) => state.sidebar.isFull);
  const dispatch = useDispatch();

  const handleToggleSidebar = () => {
    dispatch(toggleFull());
  };

  return (
    <div className="tw-col-span-full tw-flex tw-justify-between tw-items-center tw-mt-10">
      <div className="tw-flex tw-justify-between tw-items-center tw-space-x-2">
        <h1 className="tw-text-2xl tw-font-bold tw-text-gray-800 tw-m-0 tw-transition-all tw-ease-in">
          {isFull ? "TravelGo" : "TG"}
        </h1>
        <ButtonIcon
          style="tw-text-2xl tw-font-bold tw-cursor-default tw-bg-white tw-text-gray-600"
          onClick={handleToggleSidebar}
        >
          {isFull ? (
            <BsFillArrowLeftSquareFill className="tw-text-xl tw-transition-all tw-ease-in" />
          ) : (
            <BsFillArrowRightSquareFill className="tw-text-xl tw-transition-all tw-ease-in" />
          )}
        </ButtonIcon>
      </div>
      <User />
    </div>
  );
}
