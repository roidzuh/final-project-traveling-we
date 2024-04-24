import Link from "next/link";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import ButtonIcon from "./ButtonIcon";

export default function DashboardCard({
  banner,
  onEdit,
  onDelete,
  image,
  name,
  id,
  createdAt,
  updatedAt,
}) {
  return (
    <div className="tw-bg-white tw-shadow-lg tw-rounded-lg">
      <img
        src={image}
        alt={name}
        className="tw-w-full tw-h-48 tw-object-cover tw-rounded-t-lg"
      />
      <div className="tw-p-4">
        <div className="tw-flex tw-flex-col tw-justify-between tw-items-center">
          <h3 className="tw-text-lg tw-font-bold">{name}</h3>
          <div>
            <p className="tw-text-sm tw-text-gray-500 tw-font-bold">
              ID : {id}
            </p>
            <p className="tw-text-sm tw-text-gray-500 tw-font-bold">
              Created At : {new Date(createdAt).toLocaleDateString()}
            </p>
            <p className="tw-text-sm tw-text-gray-500 tw-font-bold">
              Updated At : {new Date(updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="tw-flex tw-items-center tw-justify-center tw-gap-4 tw-mt-4">
          <Link href={`/dashboard/banner/${id}`}>
            <FaEye className="tw-text-3xl tw-text-black" />
          </Link>
          <ButtonIcon onClick={onEdit}>
            <FaEdit className="tw-text-3xl tw-text-black" />
          </ButtonIcon>
          <ButtonIcon onClick={onDelete}>
            <FaTrash className="tw-text-3xl tw-text-black" />
          </ButtonIcon>
        </div>
      </div>
    </div>
  );
}
