"use client";

import { useAppSelector } from "@/lib/hooks";
import { UserType } from "@/types/enums";
import BreadCrumpet from "@/ui/BreadCrumpet/BreadCrumpet";
import FloatingWhatsAppComponent from "@/ui/FloatingWhatsAppIcon/FloatingWhatsAppIcon";
import Footer from "@/ui/Footer/Footer";
import Modal from "@/ui/Modal/Modal";
import NavBar from "@/ui/NavBar/NavBar";
import NotActiveMessage from "@/ui/NotActiveMessage/NotActiveMessage";
import UserProtectedRoute from "@/ui/UserProtectedRoute/UserProtectedRoute";
import { useEffect } from "react";

function Layout({ children }) {
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
      <BreadCrumpet />
      {children}
      {user?.role !== UserType.ADMIN && <FloatingWhatsAppComponent />}
      <Footer />
    </div>
  );
}

export default Layout;
