import styles from "./layout.module.scss";
import Navbar from "@/components/AdminDashboard/Navbar";
import Links from "@/components/AdminDashboard/Links";

interface Props {
  children: React.ReactNode;
}

function AdminPage({ children }: Props) {
  return (
    <div className="bg-gradient-to-r from-mainColor to-cyan-500  h-[100vh] px-3 py-3  ">
      <div
        className={`${styles.container} bg-white rounded-lg overflow-hidden h-full shadow-lg`}
      >
        <Navbar />
        <Links />
        <div className="bg-cyan-600 text-white col-span-full md:col-auto ">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
