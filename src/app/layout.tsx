import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layouts/header";
import appConfig from "@/config/app";
import { Toaster } from "@/components/ui/sonner";
import useUserSession from "@/hooks/useUserSession";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: appConfig.name,
  description: appConfig.name,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = await useUserSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="grid h-screen w-full">
          <div className="flex flex-col">
            <Header user={data.user} />
            <Toaster richColors />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
