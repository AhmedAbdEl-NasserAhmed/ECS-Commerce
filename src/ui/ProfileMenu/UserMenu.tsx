import { logoutUser } from "@/lib/features/usersSlice/usersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { UserType } from "@/types/enums";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSetCartItemsMutation } from "@/lib/features/api/cartItemsApi";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { HiOutlineLogout, HiOutlineViewGrid } from "react-icons/hi";
import { clearCookiesThunk } from "@/lib/features/cookieSlice/cookieSlice";
import { useTranslations } from "next-intl";
import useLogout from "@/hooks/useLogout";

function UserMenu({ setIsProfileOpen }) {
  const { locale } = useParams();

  const router = useRouter();

  const user = useAppSelector((state) => state.usersSlice.user);

  const cart = useAppSelector(
    (state) => state.cookieSlice.cookieItems.cartItems
  );

  const wishList = useAppSelector(
    (state) => state.cookieSlice.cookieItems.wishListItems
  );

  const dispatch = useAppDispatch();

  const [cartItems, setCartItems] = useSetCartItemsMutation();

  const userTranslation = useTranslations("user");

  const logout = useLogout();

  return (
    <ul className=" absolute text-xl start-0 top-12 bg-white  flex flex-col z-20 gap-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-2 w-48 font-semibold text-center  rounded-lg">
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
            <span>{userTranslation("Profile")}</span>
          </Link>
        </li>
      )}
      {user?.role === UserType.ADMIN && (
        <li className="p-2 hover:bg-gray-200 duration-200 transition-all">
          <Link
            className=" flex items-center gap-4 justify-center"
            onClick={() => setIsProfileOpen(false)}
            href={`/${locale}/admin/dashboard`}
          >
            <span className="text-3xl">
              <HiOutlineViewGrid />
            </span>
            <span>{userTranslation("Dashboard")}</span>
          </Link>
        </li>
      )}

      <li className="p-2 hover:bg-gray-200 duration-200 transition-all cursor-pointer flex justify-center items-center ">
        <button
          className="flex items-center justify-center gap-4 "
          disabled={setCartItems.isLoading}
          onClick={() => {
            if (user && user?.role === UserType.USER) {
              cartItems({
                user: user["_id"],
                cartItems: cart,
                wishListItems: wishList,
              });
            }
            logout();
            setIsProfileOpen(false);
            router.replace(`/${locale}`);
            toast.success(userTranslation("See you soon"));
            dispatch(clearCookiesThunk("wishListItems"));
            dispatch(clearCookiesThunk("cartItems"));
          }}
        >
          <span className="text-3xl">
            <HiOutlineLogout />
          </span>
          <span>{userTranslation("Log out")}</span>
        </button>
      </li>
    </ul>
  );
}

export default UserMenu;
