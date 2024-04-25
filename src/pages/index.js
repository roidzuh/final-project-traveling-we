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

export async function getServerSideProps() {
  try {
    const dataBanners = await fetchBanners();
    const banners = dataBanners?.data || [];

    const dataCategory = await fetchCategory();
    const categories = dataCategory?.data || [];

    const dataPromo = await fetchPromo();
    const promos = dataPromo?.data || [];

    const dataActivity = await fetchActivity();
    const activities = dataActivity?.data || [];

    return { props: { banners, categories, promos, activities } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: { banners: [], categories: [], promos: [], activities: [] },
    };
  }
}

export default function Home({ banners, categories, promos, activities }) {
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
