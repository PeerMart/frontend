import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import type { MenuItem } from 'primereact/menuitem';
import { Sidebar } from 'primereact/sidebar';
import React, { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { useTheme, type Theme } from '../context/ThemeContext';

export const Header: React.FC = () => {
  const { theme, actualTheme, setTheme } = useTheme();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const location = useLocation();
  const themeMenuRef = useRef<Menu>(null);
  const sidebarThemeMenuRef = useRef<Menu>(null);

  const getThemeIcon = (theme: Theme) =>
    ({ light: 'pi pi-sun', dark: 'pi pi-moon', system: actualTheme === 'dark' ? 'pi pi-moon' : 'pi pi-sun' }[theme]);

  const getThemeLabel = (theme: Theme) => ({ light: 'Light', dark: 'Dark', system: 'Device' }[theme]);

  const themeMenuItems: MenuItem[] = [
    {
      label: 'Light',
      icon: 'pi pi-sun',
      command: () => setTheme('light'),
      className: theme === 'light' ? 'bg-blue-50 dark:bg-blue-900' : ''
    },
    {
      label: 'Dark',
      icon: 'pi pi-moon',
      command: () => setTheme('dark'),
      className: theme === 'dark' ? 'bg-blue-50 dark:bg-blue-900' : ''
    },
    {
      label: 'Device',
      icon: actualTheme === 'dark' ? 'pi pi-moon' : 'pi pi-sun',
      command: () => setTheme('system'),
      className: theme === 'system' ? 'bg-blue-50 dark:bg-blue-900' : ''
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

  const NavLinks = ({ mobile = false, onItemClick }: { mobile?: boolean; onItemClick?: () => void }) => (
    <>
      {navigationItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          onClick={onItemClick}
          className={`
            ${mobile ? 'block w-full text-left p-3' : 'px-4 py-2'}
            text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400
            transition-colors duration-200 font-medium
            ${
              isActive(item.path)
                ? mobile
                  ? 'text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-gray-800 rounded-md'
                  : 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : ''
            }
            ${mobile && !isActive(item.path) ? 'hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md' : ''}
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
      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-blue-600 text-white rounded-lg p-2">
                <span className="font-bold text-xl">PM</span>
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white hidden sm:block">PeerMart</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <NavLinks />
            </nav>

            {/* Theme Toggle & Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              {/* Desktop Theme Toggle Dropdown */}
              <div className="hidden sm:block">
                <Menu ref={themeMenuRef} model={themeMenuItems} popup className="mt-2" />
                <Button
                  icon={getThemeIcon(theme)}
                  label={getThemeLabel(theme)}
                  outlined
                  onClick={(e) => themeMenuRef.current?.toggle(e)}
                  className="p-2"
                  tooltip="Change theme"
                  tooltipOptions={{ position: 'bottom' }}
                />
              </div>

              {/* Mobile Menu Button */}
              <Button
                icon="pi pi-bars"
                rounded
                text
                className="md:hidden p-2"
                onClick={() => setMobileMenuVisible(true)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <Sidebar visible={mobileMenuVisible} onHide={() => setMobileMenuVisible(false)} position="right" className="w-80">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 text-white rounded-lg p-2">
                <span className="font-bold text-lg">PM</span>
              </div>
              <span className="font-bold text-lg text-gray-900 dark:text-white">PeerMart</span>
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav className="space-y-2 mb-6">
            <NavLinks mobile onItemClick={() => setMobileMenuVisible(false)} />
          </nav>

          {/* Mobile Theme Selector */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Theme</label>
            <Menu ref={sidebarThemeMenuRef} model={themeMenuItems} popup className="mt-2" />
            <Button
              icon={getThemeIcon(theme)}
              label={getThemeLabel(theme)}
              outlined
              onClick={(e) => sidebarThemeMenuRef.current?.toggle(e)}
              className="w-full justify-start"
              tooltip="Change theme"
            />
          </div>
        </div>
      </Sidebar>
    </>
  );
};
