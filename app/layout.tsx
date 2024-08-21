import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import ReactQueryProvider from "@/utils/ReactQuery";

export const metadata: Metadata = {
  title: {
    default: "JUIT Timetable",
    template: "%s - College Timetable",
  },
  description:
    "A simple and elegant way to view your college timetable online.",
  icons: {
    icon: "/timetable.ico",
  },
  keywords:
    "JUIT, timetable, college, schedule, classes, university, Juit TimeTable, juit timetable, juit time table, juit time-table, juit-time-table, JUIT Timetable",
  openGraph: {
    title: "JUIT Timetable",
    description:
      "A simple and elegant way to view your college timetable online.",
    url: "https://juit-timetable.vercel.app",
    type: "website",
    images: [
      {
        url: "/timetable.png",
        width: 500,
        height: 500,
        alt: "JUIT Timetable",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            name="description"
            content="A simple and elegant way to view your college timetable online."
          />
          <meta
            name="keywords"
            content="JUIT, timetable, college, schedule, classes, university, Juit TimeTable, juit timetable, juit time table, juit time-table, juit-time-table, JUIT Timetable"
          />
          <meta name="author" content="Your Name" />
          <meta property="og:title" content="JUIT Timetable" />
          <meta
            property="og:description"
            content="A simple and elegant way to view your college timetable online."
          />
          <meta property="og:url" content="https://juit-timetable.vercel.app" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/timetable.png" />
          <link rel="icon" href="/timetable.ico" />
          <title>JUIT Timetable</title>
        </head>
        <body
          className={clsx(
            "min-h-screen bg-background font-sans antialiased overflow-x-hidden"
          )}
        >
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <main>{children}</main>
          </Providers>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
