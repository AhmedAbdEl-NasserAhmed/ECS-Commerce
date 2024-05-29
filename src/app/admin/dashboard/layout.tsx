import styles from "./layout.module.scss";
import Navbar from "@/components/AdminDashboard/Navbar";
import Links from "@/components/AdminDashboard/Links";

interface Props {
  children: React.ReactNode;
}

function AdminPage({ children }: Props) {
  return (
    <div className="bg-gradient-to-r from-mainColor to-cyan-500 min-h-screen px-12 py-12 ">
      <div
        className={`${styles.container} bg-white h-[90vh] w-[94%] m-auto rounded-xl overflow-hidden shadow-lg`}
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
