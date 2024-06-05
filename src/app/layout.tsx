import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import StoreProvider from "./StoreProvidet";

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
      <body suppressHydrationWarning={true} className={inter.className}>
        <StoreProvider>{children}</StoreProvider>
        <div id="modal"></div>
      </body>
    </html>
  );
}
