import { Button } from 'primereact/button';
import type React from 'react';
import { Link } from 'react-router-dom';
import { useSidebar } from '../context/SidebarContext';
import { DesktopNavigation } from './DesktopNavigation';
import { MobileSidebar } from './MobileSidebar';
import { ThemeToggle } from './ThemeToggle';
import { WalletButton } from './WalletButton';

export const Header: React.FC = () => {
  const { toggle } = useSidebar();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm shadow-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div>
                <span className="font-bold text-xl text-foreground">PeerMart</span>
                <div className="text-xs text-muted-foreground">Hedera Network</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <DesktopNavigation />
            </nav>

            {/* Theme Toggle & Wallet & Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              {/* Wallet Button */}
              <WalletButton className="hidden sm:block" />

              {/* Desktop Theme Toggle */}
              <ThemeToggle className="hidden sm:block" />

              {/* Mobile Menu Button */}
              <Button size="small" className="lg:hidden" onClick={toggle}>
                <i className="pi pi-bars" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <MobileSidebar />
    </>
  );
};
