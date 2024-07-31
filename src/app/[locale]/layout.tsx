import "../globals.scss";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

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
      <body
        suppressHydrationWarning={true}
        className={`${poppins.className} font-sans`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
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
