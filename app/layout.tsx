import "@/styles/globals.css";
import { Metadata } from "next";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import clsx from "clsx";
import ReactQueryProvider from "@/utils/ReactQueryProvider";

export const metadata: Metadata = {
    title: "Time Table",
    description: "A platform to conveniently view our college time table", themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ReactQueryProvider>
            <html lang="en" suppressHydrationWarning>
                <head />
                <body
                    className={clsx(
                        "min-h-screen bg-background font-sans antialiased overflow-x-hidden",
                        fontSans.variable
                    )}
                >
                    <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
                        <main>
                            {children}
                        </main>
                    </Providers>
                </body>
            </html>
        </ReactQueryProvider>
    );
}
