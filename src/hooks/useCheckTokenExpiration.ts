import { getExpirationDateFromToken } from "@/lib/helpers";
import { useAppSelector } from "@/lib/hooks";
import { StorageService } from "@/services/StorageService";
import { useEffect, useState } from "react";
import useLogout from "./useLogout";
import { usePathname } from "next/navigation";

const useCheckTokenExpiration = () => {
  const [userToken, setUserToken] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);
  const { isAuthenticated: isAuth } = useAppSelector(
    (store) => store.usersSlice
  );

  const pathname = usePathname();

  useEffect(() => {
    const userToken = StorageService.get("userToken", false);

    setUserToken(userToken);

    if (!userToken) {
      StorageService.delete("user");
      StorageService.delete("userToken");
    }
  }, [isAuth]);

  const currentDate = new Date();
  currentDate.setMinutes(currentDate.getMinutes() + 1);

  useEffect(() => {
    if (userToken) {
      const expirationDate = getExpirationDateFromToken(userToken);
      if (expirationDate) {
        if (new Date().getTime() >= new Date(expirationDate).getTime()) {
          logout();
        }
      }
      setExpirationDate(expirationDate);
    }
  }, [userToken, isAuth]);

  const logout = useLogout();

  useEffect(() => {
    if (userToken && expirationDate) {
      var timer = setInterval(() => {
        if (new Date().getTime() >= new Date(expirationDate).getTime()) {
          logout();
        }
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [pathname, isAuth, userToken, expirationDate]);
};

export default useCheckTokenExpiration;
