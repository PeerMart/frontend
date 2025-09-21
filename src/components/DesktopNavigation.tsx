import type React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface DesktopNavigationProps {
  mobile?: boolean;
  onItemClick?: () => void;
}

export const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ mobile = false, onItemClick }) => {
  const location = useLocation();

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

  return (
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
};
