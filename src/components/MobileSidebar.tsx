import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import type { MenuItem } from 'primereact/menuitem';
import { Sidebar } from 'primereact/sidebar';
import type React from 'react';
import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSidebar } from '../context/SidebarContext';
import { useTheme, type Theme } from '../context/ThemeContext';
import { WalletButton } from './WalletButton';

export const MobileSidebar: React.FC = () => {
  const { isVisible, hide } = useSidebar();
  const { theme, actualTheme, setTheme } = useTheme();
  const location = useLocation();
  const sidebarThemeMenuRef = useRef<Menu>(null);

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

  const NavLinks = ({ onItemClick }: { onItemClick?: () => void }) => (
    <>
      {navigationItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          onClick={onItemClick}
          className={`
            block w-full text-left p-3
            text-foreground hover:text-primary
            transition-colors duration-200 font-medium
            ${isActive(item.path) ? 'text-primary bg-primary/10 rounded-md' : 'hover:bg-muted rounded-md'}
          `}
        >
          <i className={`${item.icon} mr-2`} />
          {item.label}
        </Link>
      ))}
    </>
  );

  return (
    <Sidebar visible={isVisible} onHide={hide} position="right" className="w-80">
      <div className="p-4">
        <div className="mb-6">
          <span className="font-bold text-lg text-foreground">PeerMart</span>
          <div className="text-xs text-muted-foreground">Hedera Network</div>
        </div>

        {/* Mobile Navigation */}
        <nav className="space-y-2 mb-6">
          <NavLinks onItemClick={hide} />
        </nav>

        {/* Mobile Wallet Section */}
        <WalletButton mobile />

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
  );
};
