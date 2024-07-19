import { useAppSelector } from "@/lib/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

function UserProtectedRoute({ children }) {
  const user = useAppSelector((state) => state.usersSlice.user);

  const pathName = usePathname();

  const router = useRouter();

  const isAuthenticated = useAppSelector(
    (state) => state.usersSlice.isAuthenticated
  );

  useEffect(() => {
    const forbiddenRoutes = ["admin"];
    if (
      forbiddenRoutes.includes(pathName) &&
      user?.role === "user" &&
      (isAuthenticated || !isAuthenticated)
    ) {
      router.back();
    }
  }, [isAuthenticated, user, pathName, router]);

  return children;
}

export default UserProtectedRoute;
