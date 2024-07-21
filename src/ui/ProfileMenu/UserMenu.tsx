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
      className=" absolute text-xl left-0 top-12 bg-white  flex flex-col z-20 gap-8 shadow-[0_3px_10px_rgb(0,0,0,0.2)]  p-4 rounded-md"
    >
      {user?.role === UserType.USER && (
        <li>
          <Link
            onClick={() => setIsProfileOpen(false)}
            href={`/${locale}/user/profile`}
          >
            Profile
          </Link>
        </li>
      )}
      <li className="cursor-pointer">
        <button
          disabled={setCartItems.isLoading}
          onClick={() => {
            cartItems({ cartItems: cart });
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
          Logout
        </button>
      </li>
    </ul>
  );
}

export default UserMenu;
