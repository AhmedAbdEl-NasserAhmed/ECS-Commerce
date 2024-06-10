import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import StoreProvider from "./StoreProvidet";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pite Tech",
  description: "E commerce Web site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body suppressHydrationWarning={true} className={inter.className}>
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
      </StoreProvider>
    </html>
  );
}
