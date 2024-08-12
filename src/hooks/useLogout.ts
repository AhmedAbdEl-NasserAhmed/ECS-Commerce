import { useSetCartItemsMutation } from "@/lib/features/api/cartItemsApi";
import { clearCookiesThunk } from "@/lib/features/cookieSlice/cookieSlice";
import { logoutUser } from "@/lib/features/usersSlice/usersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { UserType } from "@/types/enums";

const useLogout = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.usersSlice.user);
  const [cartItems] = useSetCartItemsMutation();
  const cart = useAppSelector(
    (state) => state.cookieSlice.cookieItems.cartItems
  );
  const wishList = useAppSelector(
    (state) => state.cookieSlice.cookieItems.wishListItems
  );

  function logout() {
    dispatch(logoutUser());
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    if (user?.isActive) {
      if (user && user?.role === UserType.USER) {
        cartItems({
          user: user["_id"],
          cartItems: cart,
          wishListItems: wishList,
        });
      }
      // cartItems({ user: user["_id"], cartItems: cart });
      dispatch(clearCookiesThunk("cartItems"));
      dispatch(clearCookiesThunk("wishListItems"));
    }
  }

  return logout;
};

export default useLogout;
