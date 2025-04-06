import "@/app/globals.css"
import { Inter } from "next/font/google"

import { cn } from "@/lib/utils"
import { SidebarNav } from "@/components/sidebar-nav"
import { ThemeProvider } from "@/components/theme-provider"
import { MobileNav } from "@/components/mobile-nav"
import { BudgetProvider } from "@/contexts/BudgetProvider"
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Budget Planner",
  description: "A comprehensive budget planning application",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen">
            <SidebarNav />
            <div className="flex-1 flex flex-col">
              <MobileNav />
              <main className="flex-1">
                <BudgetProvider>
                {children}
                </BudgetProvider>
                </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}