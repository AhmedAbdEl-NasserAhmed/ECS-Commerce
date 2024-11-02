import { useParams, useRouter } from "next/navigation";
import { loginUser } from "@/lib/features/usersSlice/usersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import toast from "react-hot-toast";
import { concatCartItemsHandler, getUniqueValues } from "@/lib/helpers";
import { getCookie } from "cookies-next";
import { setCookiesThunk } from "@/lib/features/cookieSlice/cookieSlice";
import { StorageService } from "@/services/StorageService";
import { useTranslations } from "next-intl";

const useSuccessLogin = () => {
  const userTranslation = useTranslations("user");
  const dispatch = useAppDispatch();

  const cart = useAppSelector(
    (state) => state.cookieSlice.cookieItems.cartItems
  );

  const wishList = useAppSelector(
    (state) => state.cookieSlice.cookieItems.wishListItems
  );

  const { locale } = useParams();

  const router = useRouter();

  function successLogin(loginResponse) {
    toast.success(userTranslation("Welcome Back"));

    dispatch(
      loginUser({
        user: loginResponse.data,
        isAuthenticated: loginResponse.token,
        token: loginResponse.token,
      })
    );

    const cookiesItems = getCookie("cartItems") || "[]";

    const parsedCookiesItems = StorageService.parse(cookiesItems);

    const responseCartItems = loginResponse.data?.cookieCart?.cartItems;

    const wishListCookieitems = getCookie("wishListItems") || "[]";

    const parsedWishListItems = StorageService.parse(wishListCookieitems);

    const responseWishListItems = loginResponse.data?.cookieCart?.wishListItems;

    const concatedCartItems = concatCartItemsHandler(
      parsedCookiesItems,
      responseCartItems
    );

    const concatedWishListItems = concatCartItemsHandler(
      parsedWishListItems,
      responseWishListItems
    );

    const cartItems = loginResponse.data?.cookieCart?.cartItems
      ? getUniqueValues(concatedCartItems, ["color", "size", "product"])
      : cart;

    const wishListItems = loginResponse.data?.cookieCart?.wishListItems
      ? getUniqueValues(concatedWishListItems, ["color", "size", "product"])
      : wishList;

    dispatch(setCookiesThunk("cartItems", cartItems));

    dispatch(setCookiesThunk("wishListItems", wishListItems));

    StorageService.set("userToken", loginResponse.token, false);

    StorageService.set("user", loginResponse.data);

    router.push(`/${locale}`);
  }

  return { successLogin };
};

export default useSuccessLogin;
