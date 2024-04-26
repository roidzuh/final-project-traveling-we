import { useEffect, useState } from "react";
import MainLayout from "@/layout/MainLayout";
import Hero from "@/components/Hero";
import {
  fetchActivity,
  fetchBanners,
  fetchCategory,
  fetchPromo,
} from "../utils/api";
import Banner from "@/components/Banner";
import Category from "@/components/Category";
import Promo from "@/components/Promo";
import Activity from "@/components/Activity";
import Spinners from "@/components/Spinners";

export default function Home() {
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [promos, setPromos] = useState([]);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const dataBanners = await fetchBanners();
        setBanners(dataBanners?.data || []);

        const dataCategory = await fetchCategory();
        setCategories(dataCategory?.data || []);

        const dataPromo = await fetchPromo();
        setPromos(dataPromo?.data || []);

        const dataActivity = await fetchActivity();
        setActivities(dataActivity?.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return <Spinners />;
  }

  return (
    <MainLayout>
      <Hero />
      <Category categories={categories} />
      <Promo promos={promos} />
      <Banner banners={banners} />
      <Activity activities={activities} />
    </MainLayout>
  );
}
