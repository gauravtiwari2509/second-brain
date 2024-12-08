import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AddContentModalProvider } from "@/context/AddContentModalContext";
import { AuthProvider } from "@/context/AuthContext";
import { LoadingProvider } from "@/context/loadingContext";
import { ContentProvider } from "@/context/ContentContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
    <html lang="en">
      <head>
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charSet="utf8"
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LoadingProvider>
          <AuthProvider>
            <AddContentModalProvider>
              <ContentProvider>
              {children}
              </ContentProvider>
              </AddContentModalProvider>
          </AuthProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
