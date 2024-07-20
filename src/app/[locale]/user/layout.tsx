"use client";
import useCookie from "@/hooks/useCookie";
import { useAppSelector } from "@/lib/hooks";
import { UserType } from "@/types/enums";
import BreadCrumpet from "@/ui/BreadCrumpet/BreadCrumpet";
import CustomErrorBoundary from "@/ui/ErrorBoundary/ErrorBoundary";
import FloatingWhatsAppComponent from "@/ui/FloatingWhatsAppIcon/FloatingWhatsAppIcon";
import Footer from "@/ui/Footer/Footer";
import NavBar from "@/ui/NavBar/NavBar";
import NotActiveMessage from "@/ui/NotActiveMessage/NotActiveMessage";
import UserProtectedRoute from "@/ui/UserProtectedRoute/UserProtectedRoute";

function Layout({ children }) {
  const user = useAppSelector((state) => state.usersSlice.user);
  const cart = useAppSelector((state) => state.cartSlice.cartItems);

  useCookie("cartItems", cart);

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
