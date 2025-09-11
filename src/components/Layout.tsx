import type React from "react"
import { Outlet } from "react-router-dom"
import { Footer } from "./Footer"
import { Header } from "./Header"

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Main content area with padding for fixed header and footer */}
      <main className="flex-1 pt-16 pb-20">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
