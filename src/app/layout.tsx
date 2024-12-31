import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { getCookie } from "./utils/helper/helper";
import { AppProvider } from "@/context";
import Footer from "./component/Footer/Footer";
import Navbar from "./component/Navbar/Navbar";

const poppins = localFont({
  src: "./fonts/poppins/poppins-regular-webfont.woff",
  variable: "--font-poppins",
  weight: "400 500 600 700",
});

const Lemon = localFont({
  src: "./fonts/lemonmilk/LemonMilk.otf",
  variable: "--font-lemon",
  weight: "400 500 600 700",
});

export const metadata: Metadata = {
  title: "Zenith digital space",
  description:
    "Zenith Digital Space is your key to thriving in today’s business world. With essential digital strategies, continuous support, and innovative solutions, Zenith Digital Space enhances your online presence, targets your ideal audience, and unlocks new growth opportunities, giving you a distinct competitive advantage.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = getCookie("NEXT_LOCALES") || (await getLocale());
  const messages = await getMessages();
  const DIR = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={DIR}
    >
      <body className={`${poppins.variable} ${Lemon.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <AppProvider>
            <Navbar />
            {children}
            <Footer />
          </AppProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
