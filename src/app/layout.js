import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import AnimationController from "../components/AnimationController";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Horin Life | Digital solutions for growing businesses",
  description:
    "High-performance websites, custom web applications, and tailored software tools for small businesses.",
  metadataBase: new URL("https://www.horinlife.com"),
  openGraph: {
    title: "Horin Life | Digital solutions for growing businesses",
    description:
      "High-performance websites, custom web applications, and tailored software tools for small businesses.",
    url: "https://www.horinlife.com",
    siteName: "Horin Life",
    images: [
      {
        url: "/share-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Horin Life digital solutions for growing businesses",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Horin Life | Digital solutions for growing businesses",
    description:
      "High-performance websites, custom web applications, and tailored software tools for small businesses.",
    images: ["/share-preview.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Runs before the body is parsed so a refresh cannot restore the old scroll offset. */}
        <script
          id="reset-animations-on-reload"
          dangerouslySetInnerHTML={{
            __html: `(function () {
  try {
    var entries = performance.getEntriesByType && performance.getEntriesByType("navigation");
    var entry = entries && entries[0];
    var isReload = entry ? entry.type === "reload" : !!(performance.navigation && performance.navigation.type === 1);
    if (!isReload) return;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (location.hash) history.replaceState(history.state, "", location.pathname + location.search);
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    } catch (error) {
      window.scrollTo(0, 0);
    }
    window.addEventListener("pagehide", function () {
      if ("scrollRestoration" in history) history.scrollRestoration = "auto";
    }, { once: true });
  } catch (error) {}
})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <AnimationController>{children}</AnimationController>
        <Analytics />
      </body>
    </html>
  );
}
