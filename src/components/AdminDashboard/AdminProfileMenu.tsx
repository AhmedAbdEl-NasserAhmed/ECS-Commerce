import useClickOutside from "@/hooks/useClickOutside";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { HiOutlineLogout } from "react-icons/hi";
import useLogout from "@/hooks/useLogout";

function AdminProfileMenu({ setIsProfileOpen }) {
  const { locale } = useParams();

  const router = useRouter();

  const ref = useClickOutside({ close: setIsProfileOpen, value: false });

  const logout = useLogout();
  return (
    <ul
      ref={ref}
      className="absolute text-xl -start-28 top-12 bg-white  flex flex-col z-20 gap-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-2  font-semibold text-center  rounded-lg"
    >
      <li className="p-2 hover:bg-gray-200 duration-200 transition-all cursor-pointer flex justify-center items-center ">
        <button
          className="flex items-center justify-center gap-4 "
          onClick={() => {
            logout();
            router.push(`/${locale}/admin`);
            toast.success("Do Not Be Late");
          }}
        >
          <span className="text-3xl">
            <HiOutlineLogout />
          </span>
          <span>Logout</span>
        </button>
      </li>
    </ul>
  );
}

export default AdminProfileMenu;
