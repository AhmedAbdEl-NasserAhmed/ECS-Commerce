"use client";

import "../globals.scss";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { initThunk } from "@/lib/features/cookieSlice/cookieSlice";
import { useAppDispatch } from "@/lib/hooks";
import { getCookie, hasCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { StorageService } from "@/services/StorageService";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const pathName = usePathname();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (hasCookie("cartItems")) {
      let cartItemCookies = getCookie("cartItems");

      dispatch(initThunk("cartItems", StorageService.parse(cartItemCookies)));
    }
    if (hasCookie("wishListItems")) {
      let wishListCookies = getCookie("wishListItems");

      dispatch(
        initThunk("wishListItems", StorageService.parse(wishListCookies))
      );
    }
  }, [pathName, dispatch]);

  return (
    <html lang={locale}>
      <body
        suppressHydrationWarning={true}
        className={`${poppins.className} font-sans`}
      >
        {children}
        <div id="modal"></div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            duration: 1500,
            style: {
              background: "white",
              color: "#fff",
              fontSize: "1.2rem",
              padding: "1.4rem",
            },
            success: {
              style: {
                color: "green",
                background: "white",
              },
            },
            error: {
              style: {
                color: "red",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
