import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Viewport } from "next";
import { getSEOTags } from "@/libs/seo";
import ClientLayout from "@/components/LayoutClient";
import config from "@/config";
import Script from "next/script";
import { ABTestProvider } from "@/libs/abTesting";
import "./globals.css";

const font = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
	// Will use the primary color of your theme to show a nice theme color in the URL bar of supported browsers
	themeColor: config.colors.main,
	width: "device-width",
	initialScale: 1,
};

// This adds default SEO tags to all pages in our app.
// You can override them in each page passing params to getSOTags() function.
export const metadata = getSEOTags();

export default function RootLayout({ children }: { children: ReactNode }) {
	const theme = config.colors.theme;
	return (
		<html
			lang="en"
			data-theme={theme}
			className={font.className}
		>
			<body>
				<Script src="/scripts/anime.min.js" strategy="beforeInteractive" />
				{/* ClientLayout contains all the client wrappers (Crisp chat support, toast messages, tooltips, etc.) */}
				<ClientLayout>
					<ABTestProvider>
						{children}
					</ABTestProvider>
				</ClientLayout>
				{process.env.NODE_ENV === "production" && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
				<SpeedInsights />
			</body>
		</html>
	);
}
