import { useTranslations } from "next-intl";
import NavBar from "@/ui/NavBar/NavBar";
import Footer from "@/ui/Footer/Footer";
import Slider from "@/ui/Slider/Slider";
import ProductList from "@/ui/ProductsList/ProductsList";

function HomePage({ params: { locale } }) {
  const t = useTranslations("Index");

  return (
    <div>
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
