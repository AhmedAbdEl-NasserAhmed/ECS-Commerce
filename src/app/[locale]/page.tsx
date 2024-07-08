import { useTranslations } from "next-intl";
import NavBar from "@/ui/NavBar/NavBar";

function HomePage({ params: { locale } }) {
  const t = useTranslations("Index");

  return (
    <div className="h-screen">
      <NavBar />
    </div>
  );
}

export default HomePage;
