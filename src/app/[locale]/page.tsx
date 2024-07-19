"use client";

import NavBar from "@/ui/NavBar/NavBar";
import Footer from "@/ui/Footer/Footer";
import Slider from "@/ui/Slider/Slider";
import { useGetAllProductsQuery } from "@/lib/features/api/productsApi";
import TitledProductList from "@/components/TitledProductList/TitledProductList";
import { useAppSelector } from "@/lib/hooks";
import NotActiveMessage from "@/ui/NotActiveMessage/NotActiveMessage";
import { use, useEffect } from "react";
import BaseContainer from "@/ui/Container/BaseContainer";

import HomePageCategory from "@/ui/HomePageCategory/HomePageCategory";
import FloatingWhatsAppComponent from "@/ui/FloatingWhatsAppIcon/FloatingWhatsAppIcon";
import { UserType } from "@/types/enums";
import UserProtectedRoute from "@/ui/UserProtectedRoute/UserProtectedRoute";
import { useParams, usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

function HomePage() {
  const { data, isLoading } = useGetAllProductsQuery("products");

  const { locale } = useParams();

  const user = useAppSelector((state) => state.usersSlice.user);

  const cart = useAppSelector((state) => state.cartSlice.cartItems);

  const router = useRouter();

  const pathName = usePathname();

  let date = new Date();
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
  let expires = date.toUTCString();

  useEffect(() => {
    document.cookie = `cartItems=${JSON.stringify(
      cart
    )};  expires=${expires}; path=/`;
  }, [cart, expires]);

  useEffect(() => {
    if (pathName.includes("payment/status=success")) {
      toast.success("Your Payment is successful");
      router.replace(`/${locale}`);
    } else if (pathName.includes("payment/status=fail")) {
      toast.error("Your Payment is failed");
    }
  }, [pathName, locale, router]);

  return (
    <UserProtectedRoute>
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
      {user?.role !== UserType.ADMIN && <FloatingWhatsAppComponent />}
      <Footer />
    </UserProtectedRoute>
  );
}

export default HomePage;
