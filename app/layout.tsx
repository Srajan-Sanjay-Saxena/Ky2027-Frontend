import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono, Cinzel_Decorative } from "next/font/google";
import { MotionConfig } from "framer-motion";
import { Toaster } from "sonner";
import "./globals.css";
import GsapRegistration from "@/lib/GsapRegistration";
import { SmoothScroll } from "@/lib/SmoothScroll";
import { PageLoader } from "@/components/loader";
import { AuthProvider, QueryProvider, ApolloProvider } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Ethereal, ornate carved-in-stone display serif for the navbar / headings.
const cinzel = Cinzel_Decorative({
  variable: "--font-ethereal",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Kashi Yatra 2027 | IIT BHU Cultural Festival",
  description:
    "Kashi Yatra - The annual cultural festival of IIT (BHU) Varanasi. Experience the spiritual essence of Kashi through art, music, dance, and cultural extravaganza.",
  keywords: [
    "Kashi Yatra",
    "IIT BHU",
    "Cultural Festival",
    "Varanasi",
    "College Fest",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Toaster />
        <ApolloProvider>
          <QueryProvider>
            <AuthProvider>
              <GsapRegistration />
              <Suspense fallback={null}>
                <PageLoader />
              </Suspense>
              <MotionConfig reducedMotion="user">
                <SmoothScroll>{children}</SmoothScroll>
              </MotionConfig>
            </AuthProvider>
          </QueryProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
