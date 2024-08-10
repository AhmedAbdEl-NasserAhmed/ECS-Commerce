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
import { useTranslations } from "next-intl";
import Spinner from "@/ui/Spinner/Spinner";

function HomePage() {
  const { data, isLoading } = useGetAllProductsQuery({ limit: 6 });

  console.log("data", data);

  const { data: SaleProducts, isLoading: isLoadingSaleProducts } =
    useGetAllProductsQuery({ sale: "true", limit: 6 });

  const user = useAppSelector((state) => state.usersSlice.user);

  const t = useTranslations("user");

  useCookie("cartItems", "wishListItems");

  // return <h2>as</h2>;

  return (
    <UserProtectedRoute>
      {!user?.isActive && user && <NotActiveMessage />}
      <NavBar />
      <Slider />
      <BaseContainer className="p-36 mb-[40rem] md:mb-0">
        <HomePageCategory />
      </BaseContainer>

      <TitledProductList
        title={t("Hot Products")}
        description="Mauris luctus nisi sapien tristique dignissim ornare"
        products={data?.data}
        isLoading={isLoading}
        columns={4}
      />
      <TitledProductList
        title={t("Sale Products")}
        description="Mauris luctus nisi sapien tristique dignissim ornare"
        products={SaleProducts?.data}
        isLoading={isLoadingSaleProducts}
        columns={4}
      />

      {user && user?.role !== UserType.ADMIN && <FloatingWhatsAppComponent />}
      <Footer />
    </UserProtectedRoute>
  );
}

export default HomePage;
