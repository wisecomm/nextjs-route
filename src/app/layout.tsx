import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { FONT_NOTOSANSKR } from "./utils/fonts";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={cn(`${FONT_NOTOSANSKR.className} antialiased`)}
      >
        {children}
        {/* SHADCN Toaster 사용함 */}
        <Toaster />
        </body>
    </html>
  );
}
