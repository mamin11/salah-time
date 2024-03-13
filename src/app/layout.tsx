import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
// viewport: "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
export const metadata: Metadata = {
  title: "Salah Times",
  description: "Prayer times app",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["salah", "prayer", "salah-time", "prayer-time"],
  authors: [
    { name: "Mohamedamin Abdi" },
    {
      name: "Mohamedamin Abdi",
      url: "https://www.linkedin.com/in/mohamedamin-abdi-084852197/",
    },
  ],
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
