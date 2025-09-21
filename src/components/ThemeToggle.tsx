import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import type { MenuItem } from 'primereact/menuitem';
import type React from 'react';
import { useRef } from 'react';
import { useTheme, type Theme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, actualTheme, setTheme } = useTheme();
  const themeMenuRef = useRef<Menu>(null);

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

  return (
    <div className={className}>
      <Menu ref={themeMenuRef} model={themeMenuItems} popup className="mt-2" />
      <Button size="small" onClick={(e) => themeMenuRef.current?.toggle(e)} className="gap-2">
        <i className={getThemeIcon(theme)} />
        {getThemeLabel(theme)}
      </Button>
    </div>
  );
};
