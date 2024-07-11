import Footer from "@/ui/Footer/Footer";
import NavBar from "@/ui/NavBar/NavBar";

function layout({ children }) {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}

export default layout;
