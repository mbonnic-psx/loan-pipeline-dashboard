import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LoanFlow | Pipeline Dashboard",
  description: "Loan processing pipeline management for lending teams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
