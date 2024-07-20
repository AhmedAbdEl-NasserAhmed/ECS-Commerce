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
    "checkout",
    "login",
    "register",
    "contact",
    "payment",
  ];

  useEffect(() => {
    if (user?.role === UserType.ADMIN && forbiddenRoutes.includes(pathName)) {
      router.back();
    } else if (
      !isAuthenticated &&
      (pathName.includes("checkout") || pathName.includes("payment"))
    ) {
      router.back();
    }
  }, [forbiddenRoutes, isAuthenticated, pathName, router, user?.role]);

  return children;
}

export default UserProtectedRoute;
