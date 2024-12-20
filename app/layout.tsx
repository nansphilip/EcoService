import "@/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import HeaderClient from "@comps/client/Header";
import { combo } from "@lib/combo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Eco Service",
    description: "A fully auth-ready application template for Next.js.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full overflow-hidden">
            <body className={combo("flex h-full flex-col items-center justify-center overflow-hidden", inter.className)}>
                <HeaderClient />
                <main className="flex size-full flex-col items-center justify-center overflow-hidden">
                    <div className="flex w-full flex-col items-center justify-start overflow-y-auto p-4">{children}</div>
                </main>
            </body>
        </html>
    );
}
