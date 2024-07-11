import BreadCrumpet from "@/ui/BreadCrumpet/BreadCrumpet";
import Footer from "@/ui/Footer/Footer";
import NavBar from "@/ui/NavBar/NavBar";

function layout({ children }) {
  return (
    <div>
      <NavBar />
      <BreadCrumpet />
      {children}
      <Footer />
    </div>
  );
}

export default layout;
