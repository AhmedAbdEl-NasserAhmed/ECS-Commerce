import { useCallback, useEffect, useMemo, useRef } from "react";
import Cookies from "js-cookie";

function useCookie() {
  const ref = useRef(null);

  useEffect(() => {
    const isCookiesExisted = Cookies.get(name);

    if (!isCookiesExisted) {
      localStorage.removeItem("cartItemsExpiration");
    }

    const savedExpiration = localStorage.getItem("cartItemsExpiration");

    if (savedExpiration) {
      ref.current = new Date(savedExpiration);
    } else {
      const expirationDate = new Date();
      expirationDate.setMinutes(expirationDate.getMinutes() + 1440);
      ref.current = expirationDate;
      localStorage.setItem("cartItemsExpiration", expirationDate.toISOString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setCookieHandler = useCallback((name, value) => {
    Cookies.set(name, JSON.stringify(value), {
      expires: ref.current,
      path: "/",
    });
  }, []);

  return { setCookieHandler };
}

export default useCookie;
