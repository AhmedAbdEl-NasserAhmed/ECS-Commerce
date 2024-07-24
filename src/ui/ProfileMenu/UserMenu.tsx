import useClickOutside from "@/hooks/useClickOutside";
import { logoutUser } from "@/lib/features/usersSlice/usersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { UserType } from "@/types/enums";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useSetCartItemsMutation } from "@/lib/features/api/cartItemsApi";
import { emptyCartItems } from "@/lib/features/cartSlice/cartSlice";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { HiOutlineLogout, HiOutlineViewGrid } from "react-icons/hi";

function UserMenu({ setIsProfileOpen }) {
  const { locale } = useParams();

  const router = useRouter();

  const ref = useClickOutside({ close: setIsProfileOpen, value: false });

  const user = useAppSelector((state) => state.usersSlice.user);

  const cart = useAppSelector((state) => state.cartSlice.cartItems);

  const dispatch = useAppDispatch();

  const [cartItems, setCartItems] = useSetCartItemsMutation();

  return (
    <ul
      ref={ref}
      className=" absolute text-xl start-0 top-12 bg-white  flex flex-col z-20 gap-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-2 w-48 font-semibold text-center  rounded-lg"
    >
      {user?.role === UserType.USER && (
        <li className="p-2 hover:bg-gray-200 duration-200 transition-all">
          <Link
            className=" flex items-center gap-4 justify-center"
            onClick={() => setIsProfileOpen(false)}
            href={`/${locale}/user/profile`}
          >
            <span className="text-3xl">
              <HiOutlineUserCircle />
            </span>
            <span>Profile</span>
          </Link>
        </li>
      )}
      {user?.role === UserType.ADMIN && (
        <li className="p-2 hover:bg-gray-200 duration-200 transition-all">
          <Link
            className=" flex items-center gap-4 justify-center"
            onClick={() => setIsProfileOpen(false)}
            href={`/${locale}/admin/dashboard/products`}
          >
            <span className="text-3xl">
              <HiOutlineViewGrid />
            </span>
            <span>Dashboard</span>
          </Link>
        </li>
      )}
      <li className="p-2 hover:bg-gray-200 duration-200 transition-all cursor-pointer flex justify-center items-center ">
        <button
          className="flex items-center justify-center gap-4 "
          disabled={setCartItems.isLoading}
          onClick={() => {
            cartItems({ user: user["_id"], cartItems: cart });
            dispatch(logoutUser());
            localStorage.removeItem("userToken");
            localStorage.removeItem("user");
            localStorage.removeItem("cartItemsExpiration");
            Cookies.remove("cartItems");
            setIsProfileOpen(false);
            router.push(`/${locale}`);
            toast.success("Do Not Be Late");
            dispatch(emptyCartItems());
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

export default UserMenu;
