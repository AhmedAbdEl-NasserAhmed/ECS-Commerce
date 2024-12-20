"use client";

import NavBar from "@/ui/NavBar/NavBar";
import Footer from "@/ui/Footer/Footer";
import Slider from "@/ui/Slider/Slider";
import { useGetAllProductsQuery } from "@/lib/features/api/productsApi";
import TitledProductList from "@/components/TitledProductList/TitledProductList";
import { useAppSelector } from "@/lib/hooks";
import NotActiveMessage from "@/ui/NotActiveMessage/NotActiveMessage";
import BaseContainer from "@/ui/Container/BaseContainer";
import HomePageCategory from "@/ui/HomePageCategory/HomePageCategory";
import FloatingWhatsAppComponent from "@/ui/FloatingWhatsAppIcon/FloatingWhatsAppIcon";
import { UserType } from "@/types/enums";
import UserProtectedRoute from "@/ui/UserProtectedRoute/UserProtectedRoute";
import useCookie from "@/hooks/useCookie";
import { useTranslations } from "next-intl";
import { groupBy } from "@/lib/helpers";
import SearchBar from "@/ui/SearchBar/SearchBar";
import useMobileScreen from "@/hooks/useMobileScreen";

function HomePage() {
  const { data, isLoading } = useGetAllProductsQuery({ limit: 100 });

  const user = useAppSelector((state) => state.usersSlice.user);

  const t = useTranslations("user");

  useCookie("cartItems", "wishListItems");

  const groupedProducts = groupBy(data?.data, "slug");

  const uniqueProducts = Object.keys(groupedProducts)
    .map((key) => {
      return groupedProducts[key].find((p) => p.discount === 0);
    })
    .filter(Boolean);
  const uniqueSalesProducts = Object.keys(groupedProducts)
    .map((key) => {
      return groupedProducts[key].find((p) => p.discount > 0);
    })
    .filter(Boolean);
  const isMobileScreen = useMobileScreen();

  return (
    <UserProtectedRoute>
      {!user?.isActive && user && <NotActiveMessage />}
      <NavBar />
      {isMobileScreen && <SearchBar />}
      <Slider />
      <BaseContainer className="p-24 mb-[3rem] md:mb-0 pb-0">
        <HomePageCategory />
      </BaseContainer>

      <TitledProductList
        title={t("All Products")}
        description="Mauris luctus nisi sapien tristique dignissim ornare"
        products={data?.data}
        isLoading={isLoading}
        columns={4}
        baseContainerClass={"pb-40"}
      />
      <TitledProductList
        title={t("Hot Products")}
        description="Mauris luctus nisi sapien tristique dignissim ornare"
        products={uniqueProducts}
        isLoading={isLoading}
        columns={4}
      />
      <TitledProductList
        title={t("Sale Products")}
        description="Mauris luctus nisi sapien tristique dignissim ornare"
        products={uniqueSalesProducts}
        isLoading={isLoading}
        columns={4}
      />

      {user && user?.role !== UserType.ADMIN && <FloatingWhatsAppComponent />}
      <Footer />
    </UserProtectedRoute>
  );
}

export default HomePage;
