"use client";

import { useAppSelector } from "@/lib/hooks";
import BreadCrumpet from "@/ui/BreadCrumpet/BreadCrumpet";
import Footer from "@/ui/Footer/Footer";
import Modal from "@/ui/Modal/Modal";
import NavBar from "@/ui/NavBar/NavBar";
import NotActiveMessage from "@/ui/NotActiveMessage/NotActiveMessage";

function Layout({ children }) {
  const user = useAppSelector((state) => state.usersSlice.user);

  return (
    <div>
      {!user?.isActive && user && <NotActiveMessage />}
      <NavBar />
      <BreadCrumpet />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
