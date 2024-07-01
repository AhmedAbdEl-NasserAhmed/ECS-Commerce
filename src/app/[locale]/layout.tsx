import "../globals.scss";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import StoreProvider from "../StoreProvider";
import { Toaster } from "react-hot-toast";
import { useAppSelector } from "@/lib/hooks";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Pite Tech",
  description: "E commerce Web site",
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <StoreProvider>
        <NextIntlClientProvider messages={messages}>
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
                duration: 5000,
                style: {
                  background: "white",
                  color: "#fff",
                  fontSize: "1.2rem",
                  padding: "1.4rem",
                },
                success: {
                  style: {
                    background: "green",
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
        </NextIntlClientProvider>
      </StoreProvider>
    </html>
  );
}