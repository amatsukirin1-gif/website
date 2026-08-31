import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563eb" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

const siteUrl = "https://communityfoundation.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Community Foundation — Building Tomorrow Together",
    template: "%s | Community Foundation",
  },
  description:
    "The Community Foundation is a 501(c)(3) nonprofit empowering communities through education, healthcare, and economic opportunity — 100,000+ lives impacted since 2015 across 12 countries.",
  keywords: [
    "Community Foundation",
    "nonprofit",
    "501c3",
    "education",
    "healthcare",
    "economic empowerment",
    "CSR partnership",
    "volunteer",
    "donate",
  ],
  authors: [{ name: "Community Foundation" }],
  creator: "Community Foundation",
  publisher: "Community Foundation",
  category: "Nonprofit",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Community Foundation",
    title: "Community Foundation — Building Tomorrow Together",
    description:
      "Empowering communities through innovative partnerships, sustainable solutions, and collaborative programs since 2015.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Community Foundation — Building Tomorrow Together",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Community Foundation — Building Tomorrow Together",
    description:
      "Empowering communities through innovative partnerships since 2015. 50+ partners, 100k+ lives impacted.",
    images: ["/twitter-image"],
    creator: "@communityfdn",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-placeholder",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Community Foundation",
  url: siteUrl,
  logo: `${siteUrl}/icon.svg`,
  description:
    "501(c)(3) nonprofit empowering communities through education, healthcare, and economic development since 2015.",
  foundingDate: "2015",
  address: {
    "@type": "PostalAddress",
    streetAddress: "500 Market Street, Suite 800",
    addressLocality: "San Francisco",
    addressRegion: "CA",
    postalCode: "94105",
    addressCountry: "US",
  },
  email: "info@communityfoundation.org",
  telephone: "+1-415-555-0123",
  sameAs: [],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Prevent dark mode flash — runs before hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        ) : null}
        {children}
      </body>
    </html>
  );
}
