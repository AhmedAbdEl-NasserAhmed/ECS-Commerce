/* eslint-disable react-hooks/exhaustive-deps */

import { useAppSelector } from "@/lib/hooks";
import { UserType } from "@/types/enums";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

function UserProtectedRoute({ children }) {
  const user = useAppSelector((state) => state.usersSlice.user);

  const pathName = usePathname();

  const router = useRouter();

  const isAuthenticated = useAppSelector(
    (state) => state.usersSlice.isAuthenticated
  );

  const forbiddenRoutes = [
    // "checkout",
    "login",
    "register",
    "contact",
    // "payment",
  ];

  useEffect(() => {
    if (user?.role === UserType.ADMIN && forbiddenRoutes.includes(pathName)) {
      router.back();
    } else if (
      !isAuthenticated &&
      // pathName.includes("checkout") ||
      // (pathName.includes("payment") ||
      pathName.includes("profile")
      // )
    ) {
      router.back();
    }
    // ⚠️
    /**
     * /user/login
     */
    else if (
      isAuthenticated &&
      pathName.includes("login") &&
      pathName.includes("register")
    ) {
      router.back();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forbiddenRoutes, isAuthenticated, pathName, router, user?.role]);

  return children;
}

export default UserProtectedRoute;
