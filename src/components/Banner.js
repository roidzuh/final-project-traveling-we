import { Card } from "react-bootstrap";
import Link from "next/link";

export default function Banner({ banners }) {
  return (
    <div className="bg-white text-gray-600">
      <div className="flex flex-col items-center justify-center gap-4 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="max-w-3xl text-center">
          <h2>Popular Destinations</h2>
          <p>&quot;Find your best experience&quot;</p>
        </div>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {banners.map((banner) => (
              <Link href={`/banners/${banner.id}`} key={banner.id}>
                <Card style={{ width: "18rem", position: "relative" }}>
                  <Card.Img
                    variant="top"
                    src={banner.imageUrl}
                    alt={banner.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="card-overlay absolute inset-0 rounded-lg bg-black bg-opacity-50 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <Card.Body className="text-white text-center">
                      <Card.Title>{banner.name}</Card.Title>
                    </Card.Body>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
