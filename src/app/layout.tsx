import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amit Dewangan | Full-stack Software Engineer",
  description:
    "Amit Dewangan's portfolio for full-stack software engineering across web and mobile products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
