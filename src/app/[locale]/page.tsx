"use client";

import NavBar from "@/ui/NavBar/NavBar";
import Footer from "@/ui/Footer/Footer";
import Slider from "@/ui/Slider/Slider";
import { useGetAllProductsQuery } from "@/lib/features/api/productsApi";
import TitledProductList from "@/components/TitledProductList/TitledProductList";
import { useAppSelector } from "@/lib/hooks";
import NotActiveMessage from "@/ui/NotActiveMessage/NotActiveMessage";

function HomePage() {
  const { data, isLoading } = useGetAllProductsQuery("products");

  const user = useAppSelector((state) => state.usersSlice.user);

  return (
    <div>
      {!user?.isActive && user && <NotActiveMessage />}
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
