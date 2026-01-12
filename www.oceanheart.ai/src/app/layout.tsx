import { Noto_Serif, Noto_Sans, Noto_Serif_JP, Geist_Mono, JetBrains_Mono, Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ChatProvider } from "@/contexts/ChatContext";
import { Providers } from "./providers";
import { KeyboardNavigation } from "@/components/terminal";
import "./globals.css";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Terminal aesthetic fonts for oceanheart.ai rebrand
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata = {
  title: "oceanheart.ai",
  description: "Engineering-focused consulting and AI solutions. Building robust systems with precision and purpose.",
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'oceanheart.ai',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSerif.variable} ${notoSans.variable} ${notoSerifJP.variable} ${geistMono.variable} ${jetbrainsMono.variable} ${inter.variable} antialiased`}
      >
        <Providers>
          <ChatProvider>
            <SpeedInsights />
            <KeyboardNavigation />
            {children}
          </ChatProvider>
        </Providers>
      </body>
    </html>
  );
}
