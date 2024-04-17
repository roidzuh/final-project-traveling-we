import { Card } from "react-bootstrap";
import Link from "next/link";

export default function Banner({ banners }) {
  return (
    <div className="bg-white text-gray-600 w-full">
      <div className="flex flex-col items-center justify-center gap-4 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="max-w-3xl text-center">
          <h2>Popular Destinations</h2>
          <p>&quot;Find your best experience&quot;</p>
        </div>
        <div>
          <div className="flex gap-4 flex-wrap justify-center">
            {banners.map((banner) => (
              <div
                className="card relative"
                style={{ width: "18rem" }}
                key={banner.id}
              >
                <img
                  src={banner.imageUrl}
                  alt={banner.name}
                  className="w-full h-52 object-cover rounded-md transition duration-300 ease-in-out hover:blur-sm"
                />
                <div className="card-body absolute w-full h-full top-0 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300 ease-in-out bg-black bg-opacity-50 rounded-md">
                  <h5 className="text-white text-center mb-4">{banner.name}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
