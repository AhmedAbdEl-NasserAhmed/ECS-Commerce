"use client";

import { useAppSelector } from "@/lib/hooks";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const router = useRouter();

  const { locale } = useParams();

  const user = useAppSelector((state) => state.usersSlice);

  useEffect(() => {
    if (user.isAuthenticated) {
      router.push(`/${locale}/admin/dashboard/product`);
    } else {
      router.push(`/${locale}/admin`);
    }
  }, [router, locale, user]);

  return children;
}

export default ProtectedRoute;
