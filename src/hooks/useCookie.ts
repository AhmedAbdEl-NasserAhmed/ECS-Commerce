import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getCookie, hasCookie } from "cookies-next";
import { initThunk } from "@/lib/features/cookieSlice/cookieSlice";
import { StorageService } from "@/services/StorageService";
import { useAppDispatch } from "@/lib/hooks";

function useCookie(cookies1, cookies2) {
  const pathName = usePathname();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (hasCookie(cookies1)) {
      let cartItemCookies = getCookie(cookies1);

      dispatch(initThunk(cookies1, StorageService.parse(cartItemCookies)));
    }
    if (hasCookie(cookies2)) {
      let wishListCookies = getCookie(cookies2);

      dispatch(initThunk(cookies2, StorageService.parse(wishListCookies)));
    }
  }, [pathName, dispatch, cookies1, cookies2]);
}

export default useCookie;
