"use client"

import { Button } from "primereact/button"
import type React from "react"

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center py-4 space-y-2 sm:space-y-0">
          {/* Copyright */}
          <div className="text-sm text-muted-foreground">© {currentYear} PeerMart. Built on Hedera Network.</div>

          {/* Social Links */}
          <div className="flex items-center space-x-2">
            <Button
              size="small"
              onClick={() => window.open("https://twitter.com/peermart", "_blank")}
              className="text-muted-foreground hover:text-primary"
            >
              <i className="pi pi-twitter text-lg" />
            </Button>
            <Button
              size="small"
              onClick={() => window.open("https://github.com/peermart", "_blank")}
              className="text-muted-foreground hover:text-primary"
            >
              <i className="pi pi-github text-lg" />
            </Button>
            <Button
              size="small"
              onClick={() => window.open("https://hedera.com", "_blank")}
              className="text-muted-foreground hover:text-primary"
            >
              <i className="pi pi-globe text-lg" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
