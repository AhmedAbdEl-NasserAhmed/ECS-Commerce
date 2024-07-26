"use client";
import { initThunk } from "@/lib/features/cookieSlice/cookieSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { StorageService } from "@/services/StorageService";
import { UserType } from "@/types/enums";
import BreadCrumpet from "@/ui/BreadCrumpet/BreadCrumpet";
import CustomErrorBoundary from "@/ui/ErrorBoundary/ErrorBoundary";
import FloatingWhatsAppComponent from "@/ui/FloatingWhatsAppIcon/FloatingWhatsAppIcon";
import Footer from "@/ui/Footer/Footer";
import NavBar from "@/ui/NavBar/NavBar";
import NotActiveMessage from "@/ui/NotActiveMessage/NotActiveMessage";
import UserProtectedRoute from "@/ui/UserProtectedRoute/UserProtectedRoute";
import { getCookie, hasCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function Layout({ children }) {
  const user = useAppSelector((state) => state.usersSlice.user);

  const pathName = usePathname();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (hasCookie("cartItems")) {
      let cartItemCookies = getCookie("cartItems");

      dispatch(initThunk("cartItems", StorageService.parse(cartItemCookies)));
    }
    if (hasCookie("wishListItems")) {
      let wishListCookies = getCookie("wishListItems");

      dispatch(
        initThunk("wishListItems", StorageService.parse(wishListCookies))
      );
    }
  }, [pathName, dispatch]);

  return (
    <CustomErrorBoundary>
      <UserProtectedRoute>
        {!user?.isActive && user && <NotActiveMessage />}
        <NavBar />
        <BreadCrumpet />
        {children}
        {user?.role !== UserType.ADMIN && <FloatingWhatsAppComponent />}
        <Footer />
      </UserProtectedRoute>
    </CustomErrorBoundary>
  );
}

export default Layout;
