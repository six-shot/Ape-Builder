import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "APE BUILDER",
  description: "Build your own APE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
