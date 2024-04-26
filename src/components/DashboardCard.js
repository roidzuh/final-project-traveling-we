import Link from "next/link";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import ButtonIcon from "./ButtonIcon";

export default function DashboardCard({
  linkId,
  onEdit,
  onDelete,
  image,
  name,
  id,
  createdAt,
  updatedAt,
}) {
  return (
    <div className="tw-bg-gray-100 tw-shadow-lg tw-rounded-lg tw-transition-all tw-duration-300 hover:tw-shadow-none hover:tw-transition-all hover:tw-duration-300 tw-max-w-full">
      <img
        src={image}
        alt={name}
        className="tw-w-full tw-h-36 tw-object-cover tw-rounded-t-lg md:tw-h-40 lg:tw-h-48"
      />
      <div className="tw-p-4">
        <div className="tw-flex tw-flex-col tw-justify-between tw-items-center">
          <h3 className="tw-text-base tw-font-bold md:tw-text-lg lg:tw-text-xl">
            {name}
          </h3>
          <div>
            <p className="tw-text-xs tw-text-gray-500 tw-font-bold md:tw-text-sm lg:tw-text-base">
              ID : {id}
            </p>
            <p className="tw-text-xs tw-text-gray-500 tw-font-bold md:tw-text-sm lg:tw-text-base">
              Created At : {new Date(createdAt).toLocaleDateString()}
            </p>
            <p className="tw-text-xs tw-text-gray-500 tw-font-bold md:tw-text-sm lg:tw-text-base">
              Updated At : {new Date(updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="tw-flex tw-items-center tw-justify-center tw-gap-8 tw-mt-4">
          <Link href={linkId}>
            <FaEye className="tw-text-4xl tw-text-black tw-bg-gray-200 tw-p-2 tw-rounded-lg hover:tw-bg-gray-400" />
          </Link>
          <ButtonIcon onClick={onEdit}>
            <FaEdit className="tw-text-4xl tw-text-black tw-bg-gray-200 tw-p-2 tw-rounded-lg hover:tw-bg-gray-400 " />
          </ButtonIcon>
          <ButtonIcon onClick={onDelete}>
            <FaTrash className="tw-text-4xl tw-text-black tw-bg-gray-200 tw-p-2 tw-rounded-lg hover:tw-bg-gray-400" />
          </ButtonIcon>
        </div>
      </div>
    </div>
  );
}
