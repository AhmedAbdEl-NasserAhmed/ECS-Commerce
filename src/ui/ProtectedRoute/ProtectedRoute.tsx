"use client";

import { useAppSelector } from "@/lib/hooks";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const router = useRouter();

  const { locale } = useParams();

  const searchParams = useSearchParams();

  const user = useAppSelector((state) => state.usersSlice);

  const pathname = usePathname();

  const authRoutes = ["/admin"];

  // useEffect(() => {
  //   const isAuthAdminRoute = authRoutes.includes(
  //     "/" + pathname.split("/").at(-1)
  //   );

  //   const params = Object.fromEntries(searchParams.entries());

  //   if (user.isAuthenticated) {
  //     if (params?.loggedIn) {
  //       return;
  //     } else {
  //       if (isAuthAdminRoute) {
  //         router.back();
  //       } else {
  //         return;
  //       }
  //     }
  //   } else {
  //     if (isAuthAdminRoute) {
  //       return;
  //     } else {
  //       router.push(`/${locale}/admin`);
  //       return;
  //     }
  //   }
  // }, [router, locale, user, pathname, searchParams, authRoutes]);

  useEffect(() => {
    if (typeof window !== undefined) {
      const pathname = window.location.pathname;
      const isAuthAdminRoute = authRoutes.includes(
        "/" + pathname.split("/").at(-1)
      );

      if (user.isAuthenticated) {
        if (isAuthAdminRoute) {
          router.push(`/${locale}/admin/dashboard/product`);
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
