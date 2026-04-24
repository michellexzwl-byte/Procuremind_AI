import type { Metadata } from "next";
import { Manrope, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { AppToaster } from "@/components/ui/toaster";
import type React from "react";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const notoSansSC = Noto_Sans_SC({ subsets: ["latin"], variable: "--font-cn" });

export const metadata: Metadata = {
  title: "ProcureMind AI | 采购AI助手",
  description: "企业采购 AI 工作台高保真 Demo"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${manrope.variable} ${notoSansSC.variable} font-[var(--font-cn)]`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <AppToaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
