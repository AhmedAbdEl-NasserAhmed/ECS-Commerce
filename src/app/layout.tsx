"use client";

import CustomErrorBoundary from "@/ui/ErrorBoundary/ErrorBoundary";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CustomErrorBoundary>
      <html>
        <body>{children}</body>
      </html>
    </CustomErrorBoundary>
  );
}
