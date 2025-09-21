import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import type { MenuItem } from 'primereact/menuitem';
import { Sidebar } from 'primereact/sidebar';
import { Toast } from 'primereact/toast';
import type React from 'react';
import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme, type Theme } from '../context/ThemeContext';

export const Header: React.FC = () => {
  const { theme, actualTheme, setTheme } = useTheme();
  const { isConnected, wallet, connectWallet, disconnectWallet, isConnecting, error } = useAuth();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const location = useLocation();
  const themeMenuRef = useRef<Menu>(null);
  const sidebarThemeMenuRef = useRef<Menu>(null);
  const walletMenuRef = useRef<Menu>(null);
  const toastRef = useRef<Toast>(null);

  const getThemeIcon = (theme: Theme) =>
    ({ light: 'pi pi-sun', dark: 'pi pi-moon', system: actualTheme === 'dark' ? 'pi pi-moon' : 'pi pi-sun' }[theme]);

  const getThemeLabel = (theme: Theme) => ({ light: 'Light', dark: 'Dark', system: 'Device' }[theme]);

  const themeMenuItems: MenuItem[] = [
    {
      label: 'Light Theme',
      icon: 'pi pi-sun',
      command: () => setTheme('light'),
      className: theme === 'light' ? 'bg-primary/10' : ''
    },
    {
      label: 'Dark Theme',
      icon: 'pi pi-moon',
      command: () => setTheme('dark'),
      className: theme === 'dark' ? 'bg-primary/10' : ''
    },
    {
      label: 'Device Default',
      icon: actualTheme === 'dark' ? 'pi pi-moon' : 'pi pi-sun',
      command: () => setTheme('system'),
      className: theme === 'system' ? 'bg-primary/10' : ''
    }
  ];

  const walletMenuItems: MenuItem[] = [
    {
      label: 'Copy Address',
      icon: 'pi pi-copy',
      command: () => {
        if (wallet?.address) {
          navigator.clipboard.writeText(wallet.address);
          toastRef.current?.show({
            severity: 'success',
            summary: 'Copied',
            detail: 'Address copied to clipboard',
            life: 2000
          });
        }
      }
    },
    {
      label: 'Disconnect',
      icon: 'pi pi-sign-out',
      command: disconnectWallet
    }
  ];

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
    } catch (err) {
      toastRef.current?.show({
        severity: 'error',
        summary: 'Connection Failed',
        detail: error || 'Failed to connect wallet',
        life: 5000
      });
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const navigationItems = [
    { label: 'Buy', path: '/', icon: 'pi pi-shopping-cart' },
    { label: 'Sell', path: '/sell', icon: 'pi pi-tags' },
    { label: 'Activity', path: '/activity', icon: 'pi pi-chart-line' },
    { label: 'About', path: '/about', icon: 'pi pi-info-circle' }
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const NavLinks = ({ mobile = false, onItemClick }: { mobile?: boolean; onItemClick?: () => void }) => (
    <>
      {navigationItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          onClick={onItemClick}
          className={`
            ${mobile ? 'block w-full text-left p-3' : 'px-4 py-2'}
            text-foreground hover:text-primary
            transition-colors duration-200 font-medium
            ${
              isActive(item.path)
                ? mobile
                  ? 'text-primary bg-primary/10 rounded-md'
                  : 'text-primary border-b-2 border-primary'
                : ''
            }
            ${mobile && !isActive(item.path) ? 'hover:bg-muted rounded-md' : ''}
          `}
        >
          <i className={`${item.icon} mr-2`} />
          {item.label}
        </Link>
      ))}
    </>
  );

  return (
    <>
      <Toast ref={toastRef} />
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
              <NavLinks />
            </nav>

            {/* Theme Toggle & Wallet & Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              {/* Wallet Button */}
              <div className="hidden sm:block">
                {isConnected && wallet ? (
                  <>
                    <Menu ref={walletMenuRef} model={walletMenuItems} popup className="mt-2" />
                    <Button
                      size="small"
                      onClick={(e) => walletMenuRef.current?.toggle(e)}
                      className="gap-2"
                      severity="success"
                    >
                      <i className="pi pi-wallet" />
                      <span>{formatAddress(wallet.address)}</span>
                    </Button>
                  </>
                ) : (
                  <Button size="small" onClick={handleConnectWallet} loading={isConnecting} className="gap-2">
                    <i className="pi pi-wallet" />
                    Connect Wallet
                  </Button>
                )}
              </div>

              {/* Desktop Theme Toggle Dropdown */}
              <div className="hidden sm:block">
                <Menu ref={themeMenuRef} model={themeMenuItems} popup className="mt-2" />
                <Button size="small" onClick={(e) => themeMenuRef.current?.toggle(e)} className="gap-2">
                  <i className={getThemeIcon(theme)} />
                  {getThemeLabel(theme)}
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <Button size="small" className="lg:hidden" onClick={() => setMobileMenuVisible(true)}>
                <i className="pi pi-bars" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <Sidebar visible={mobileMenuVisible} onHide={() => setMobileMenuVisible(false)} position="right" className="w-80">
        <div className="p-4">
          <div className="mb-6">
            <span className="font-bold text-lg text-foreground">PeerMart</span>
            <div className="text-xs text-muted-foreground">Hedera Network</div>
          </div>

          {/* Mobile Navigation */}
          <nav className="space-y-2 mb-6">
            <NavLinks mobile onItemClick={() => setMobileMenuVisible(false)} />
          </nav>

          {/* Mobile Wallet Section */}
          <div className="border-t border-border pt-4 mb-6">
            <label className="block text-sm font-medium text-foreground mb-3">Wallet</label>
            {isConnected && wallet ? (
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-md">
                  <div className="text-sm text-muted-foreground">Connected</div>
                  <div className="font-mono text-sm">{formatAddress(wallet.address)}</div>
                  <div className="text-xs text-muted-foreground mt-1">{parseFloat(wallet.balance).toFixed(4)} HBAR</div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="small"
                    className="flex-1 gap-2"
                    onClick={() => {
                      if (wallet?.address) {
                        navigator.clipboard.writeText(wallet.address);
                        toastRef.current?.show({
                          severity: 'success',
                          summary: 'Copied',
                          detail: 'Address copied to clipboard',
                          life: 2000
                        });
                      }
                    }}
                  >
                    <i className="pi pi-copy" />
                    Copy
                  </Button>
                  <Button size="small" severity="secondary" className="flex-1 gap-2" onClick={disconnectWallet}>
                    <i className="pi pi-sign-out" />
                    Disconnect
                  </Button>
                </div>
              </div>
            ) : (
              <Button onClick={handleConnectWallet} loading={isConnecting} className="w-full gap-2">
                <i className="pi pi-wallet" />
                Connect Wallet
              </Button>
            )}
          </div>

          {/* Mobile Theme Selector */}
          <div className="border-t border-border pt-4">
            <label className="block text-sm font-medium text-foreground mb-3">Theme</label>
            <Menu ref={sidebarThemeMenuRef} model={themeMenuItems} popup className="mt-2" />
            <Button onClick={(e) => sidebarThemeMenuRef.current?.toggle(e)} className="w-full justify-start gap-2">
              <i className={getThemeIcon(theme)} />
              {getThemeLabel(theme)}
            </Button>
          </div>
        </div>
      </Sidebar>
    </>
  );
};
