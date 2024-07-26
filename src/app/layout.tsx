import StoreProvider from "./StoreProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orca  ",
  description: "E commerce Web site",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <StoreProvider>{children}</StoreProvider>;
}
