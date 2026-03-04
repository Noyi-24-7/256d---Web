import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const delight = localFont({
  src: [
    { path: "../../public/fonts/delight/delight-thin.otf", weight: "100" },
    { path: "../../public/fonts/delight/delight-extralight.otf", weight: "200" },
    { path: "../../public/fonts/delight/delight-light.otf", weight: "300" },
    { path: "../../public/fonts/delight/delight-regular.otf", weight: "400" },
    { path: "../../public/fonts/delight/delight-medium.otf", weight: "500" },
    { path: "../../public/fonts/delight/delight-semibold.otf", weight: "600" },
    { path: "../../public/fonts/delight/delight-bold.otf", weight: "700" },
    { path: "../../public/fonts/delight/delight-extrabold.otf", weight: "800" },
    { path: "../../public/fonts/delight/delight-black.otf", weight: "900" },
  ],
  variable: "--font-delight",
});

export const metadata: Metadata = {
  title: "Lightning to UPI bridge - 256d",
  description: "Instant Payments from Bitcoin to UPI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${delight.variable} font-sans antialiased`}>
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  );
}
