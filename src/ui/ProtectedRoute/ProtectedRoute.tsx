"use client";

import { useAppSelector } from "@/lib/hooks";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const router = useRouter();

  const { locale } = useParams();

  const user = useAppSelector((state) => state.usersSlice);

  const pathName = usePathname();

  const authRoutes = ["/admin"];

  const isAuthAdminRoute = authRoutes.includes(
    "/" + pathName.split("/").at(-1)
  );

  console.log("isAuthAdminRoute", isAuthAdminRoute);

  useEffect(() => {
    if (user.isAuthenticated) {
      console.log("1");
      router.push(`/${locale}/admin/dashboard/product`);

      if (isAuthAdminRoute) {
        console.log("2");
        router.back();
      } else {
        console.log("3");
      }
    } else {
      if (isAuthAdminRoute) {
        console.log("4");
      } else {
        console.log("5");
        router.push(`/${locale}/admin`);
      }
    }
  }, [router, locale, user, isAuthAdminRoute]);

  return children;
}

export default ProtectedRoute;
