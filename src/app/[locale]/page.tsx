"use client";

import NavBar from "@/ui/NavBar/NavBar";
import Footer from "@/ui/Footer/Footer";
import Slider from "@/ui/Slider/Slider";
import { useGetAllProductsQuery } from "@/lib/features/api/productsApi";
import TitledProductList from "@/components/TitledProductList/TitledProductList";
import { useAppSelector } from "@/lib/hooks";
import NotActiveMessage from "@/ui/NotActiveMessage/NotActiveMessage";
import { useEffect } from "react";
import BaseContainer from "@/ui/Container/BaseContainer";

import HomePageCategory from "@/ui/HomePageCategory/HomePageCategory";
import FloatingWhatsAppComponent from "@/ui/FloatingWhatsAppIcon/FloatingWhatsAppIcon";

function HomePage() {
  const { data, isLoading } = useGetAllProductsQuery("products");

  const user = useAppSelector((state) => state.usersSlice.user);

  const cart = useAppSelector((state) => state.cartSlice.cartItems);

  let date = new Date();
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
  let expires = date.toUTCString();

  useEffect(() => {
    document.cookie = `cartItems=${JSON.stringify(
      cart
    )};  expires=${expires}; path=/`;
  }, [cart, expires]);

  return (
    <div>
      {!user?.isActive && user && <NotActiveMessage />}
      <NavBar />
      <Slider />
      <BaseContainer className="p-36">
        <HomePageCategory />
      </BaseContainer>

      <TitledProductList
        title="Hot Products"
        description="Mauris luctus nisi sapien tristique dignissim ornare"
        products={data?.data}
        isLoading={isLoading}
      />
      <FloatingWhatsAppComponent />
      <Footer />
    </div>
  );
}

export default HomePage;
