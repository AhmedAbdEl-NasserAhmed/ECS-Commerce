"use client";

import { useAppSelector } from "@/lib/hooks";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect } from "react";

enum UserType {
  ADMIN = "ADMIN",
  USER = "USER",
}

function ProtectedRoute({ children }) {
  const router = useRouter();

  const { locale } = useParams();

  const searchParams = useSearchParams();

  const user = useAppSelector((state) => state.usersSlice);

  const pathname = usePathname();

  const authRoutes = ["/admin"];

  console.log("USER", user);

  useEffect(() => {
    if (typeof window !== undefined) {
      const pathname = window.location.pathname;
      const isAuthAdminRoute = authRoutes.includes(
        "/" + pathname.split("/").at(-1)
      );

      if (user.isAuthenticated) {
        if (isAuthAdminRoute) {
          router.push(`/${locale}/admin/dashboard/products`);
        } else {
          return;
        }
      } else {
        if (isAuthAdminRoute) {
          return;
        } else {
          router.push(`/${locale}/admin`);
          return;
        }
      }
    }
  }, [typeof window, router, locale, user, pathname, searchParams, authRoutes]);

  return children;
}

export default ProtectedRoute;
