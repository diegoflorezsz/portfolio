import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DZSZ",
  description: "A macOS-inspired desktop portfolio foundation built with Next.js, TypeScript, and Tailwind CSS.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
