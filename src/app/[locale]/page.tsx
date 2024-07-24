"use client";

import NavBar from "@/ui/NavBar/NavBar";
import Footer from "@/ui/Footer/Footer";
import Slider from "@/ui/Slider/Slider";
import { useGetAllProductsQuery } from "@/lib/features/api/productsApi";
import TitledProductList from "@/components/TitledProductList/TitledProductList";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import NotActiveMessage from "@/ui/NotActiveMessage/NotActiveMessage";
import BaseContainer from "@/ui/Container/BaseContainer";
import HomePageCategory from "@/ui/HomePageCategory/HomePageCategory";
import FloatingWhatsAppComponent from "@/ui/FloatingWhatsAppIcon/FloatingWhatsAppIcon";
import { UserType } from "@/types/enums";
import UserProtectedRoute from "@/ui/UserProtectedRoute/UserProtectedRoute";
import useCookie from "@/hooks/useCookie";
import { useEffect, useState } from "react";

function HomePage() {
  const { data, isLoading } = useGetAllProductsQuery({ limit: 6 });

  const { data: SaleProducts, isLoading: isLoadingSaleProducts } =
    useGetAllProductsQuery({ sale: "true", limit: 6 });

  const user = useAppSelector((state) => state.usersSlice.user);

  const cart = useAppSelector((state) => state.cartSlice.cartItems);

  const { setCookieHandler } = useCookie();

  useEffect(() => {
    setCookieHandler("cartItems", cart);
  }, [cart, setCookieHandler]);

  return (
    <UserProtectedRoute>
      {!user?.isActive && user && <NotActiveMessage />}
      <NavBar />
      <Slider />
      <BaseContainer className="p-36 mb-[40rem] md:mb-0">
        <HomePageCategory />
      </BaseContainer>

      <TitledProductList
        title="Hot Products"
        description="Mauris luctus nisi sapien tristique dignissim ornare"
        products={data?.data}
        isLoading={isLoading}
      />

      <TitledProductList
        title="Sale Products"
        description="Mauris luctus nisi sapien tristique dignissim ornare"
        products={SaleProducts?.data}
        isLoading={isLoadingSaleProducts}
      />
      {user?.role !== UserType.ADMIN && <FloatingWhatsAppComponent />}
      <Footer />
    </UserProtectedRoute>
  );
}

export default HomePage;
