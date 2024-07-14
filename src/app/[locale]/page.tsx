"use client";

import NavBar from "@/ui/NavBar/NavBar";
import Footer from "@/ui/Footer/Footer";
import Slider from "@/ui/Slider/Slider";
import { useGetAllProductsQuery } from "@/lib/features/api/productsApi";
import TitledProductList from "@/components/TitledProductList/TitledProductList";

function HomePage({ params: { locale } }) {
  const { data, isLoading } = useGetAllProductsQuery("products");

  return (
    <div>
      <NavBar />
      <Slider />
      <TitledProductList
        title="Hot Products"
        description="Mauris luctus nisi sapien tristique dignissim ornare"
        products={data?.data}
        isLoading={isLoading}
      />

      <Footer />
    </div>
  );
}

export default HomePage;
