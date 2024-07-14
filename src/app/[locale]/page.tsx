"use client";

import { useTranslations } from "next-intl";
import NavBar from "@/ui/NavBar/NavBar";
import Footer from "@/ui/Footer/Footer";
import Slider from "@/ui/Slider/Slider";
import ProductList from "@/ui/ProductsList/ProductsList";
import { useAppSelector } from "@/lib/hooks";
import NotActiveMessage from "@/ui/NotActiveMessage/NotActiveMessage";
import Modal from "@/ui/Modal/Modal";

function HomePage() {
  const t = useTranslations("Index");

  const user = useAppSelector((state) => state.usersSlice.user);

  return (
    <div>
      {!user?.isActive && user && <NotActiveMessage />}
      <NavBar />
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl font-semibold">See All Products</h1>
        <ProductList />
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
