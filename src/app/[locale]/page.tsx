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
import { getUniqueValues, isProductExisted } from "@/lib/helpers";

function HomePage() {
  const { data, isLoading } = useGetAllProductsQuery({ limit: 4 });

  const user = useAppSelector((state) => state.usersSlice.user);

  const cart = useAppSelector((state) => state.cartSlice.cartItems);

  // const existedProducts = useAppSelector(
  //   (state) => state.cartSlice.existedProduct
  // );

  // const userCookiesItems = isProductExisted(
  //   existedProducts,
  //   "cartItemId",
  //   user?.cookieCart?.cartItems
  // );

  // const cartItems = user
  //   ? getUniqueValues(cart.concat(userCookiesItems), [
  //       "color",
  //       "size",
  //       "product",
  //     ])
  //   : cart;

  const { setCookieHandler } = useCookie();

  setCookieHandler("cartItems", cart);

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
