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

function HomePage() {
  const { data, isLoading } = useGetAllProductsQuery({ limit: 6 });

  const user = useAppSelector((state) => state.usersSlice.user);

  const t = useTranslations("user");

  useCookie("cartItems", "wishListItems");

  const groupedProducts = groupBy(data?.data, "slug");

  const uniqueProducts = Object.keys(groupedProducts).map(
    (key) => groupedProducts[key][0]
  );

  const products = uniqueProducts?.filter((p) => p.discount === 0);

  const saleProducts = uniqueProducts?.filter((p) => p.discount > 0);

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
        products={products}
        isLoading={isLoading}
        columns={4}
      />
      <TitledProductList
        title={t("Sale Products")}
        description="Mauris luctus nisi sapien tristique dignissim ornare"
        products={saleProducts}
        isLoading={isLoading}
        columns={4}
      />

      {user && user?.role !== UserType.ADMIN && <FloatingWhatsAppComponent />}
      <Footer />
    </UserProtectedRoute>
  );
}

export default HomePage;
