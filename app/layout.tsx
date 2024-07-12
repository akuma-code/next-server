import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppBar, Breadcrumbs, Toolbar } from "@mui/material";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "next_server",
    description: "Server for apps",
    icons: "icon.ico",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AppBar position="fixed">
                    <Toolbar variant="dense">
                        <Breadcrumbs separator={"/"}>
                            <Link href="/">Home</Link>
                            <Link href="/nets">Nets</Link>
                        </Breadcrumbs>
                    </Toolbar>
                </AppBar>
                {children}
            </body>
        </html>
    );
}
