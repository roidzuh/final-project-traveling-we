import { useState, useEffect } from "react";
import MainLayout from "@/layout/MainLayout";
import { fetchPromo } from "../../utils/api";
import Link from "next/link";

export default function PromoPage() {
  const [promos, setPromos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPromo().then((data) => {
      setPromos(data.data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto my-12 p-5 min-h-screen flex justify-center items-center">
          <div>Loading...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto my-12 p-5 min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {promos.map((promo) => (
            <Link
              key={promo.id}
              href={`/promo/${promo.id}`}
              className="bg-white rounded-lg shadow overflow-hidden no-underline text-gray-600"
            >
              <img
                src={promo.imageUrl}
                alt={promo.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{promo.title}</h3>
                <p>{promo.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
