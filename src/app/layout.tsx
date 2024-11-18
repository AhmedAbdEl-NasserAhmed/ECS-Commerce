import StoreProvider from "./StoreProvider";
import { Metadata } from "next";
import "react-quill/dist/quill.snow.css";

export const metadata: Metadata = {
  title: "ORCA - Your One-Stop E-Commerce Destination for Quality Products",
  description:
    "Discover a wide range of quality products at Orca, your trusted online shopping destination. From electronics to fashion, find everything you need with exceptional deals and fast shipping. Shop now and experience the best in e-commerce!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <StoreProvider>{children}</StoreProvider>;
}
