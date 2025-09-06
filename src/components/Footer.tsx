import { Button } from 'primereact/button';
import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center py-4 space-y-2 sm:space-y-0">
          {/* Copyright */}
          <div className="text-sm text-gray-600 dark:text-gray-400">© {currentYear} PeerMart. All rights reserved.</div>

          {/* Social Links */}
          <div className="flex items-center space-x-2">
            <Button
              icon="pi pi-twitter"
              rounded
              text
              size="small"
              onClick={() => window.open('https://twitter.com/peermart', '_blank')}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
              tooltip="Follow us on Twitter"
              tooltipOptions={{ position: 'top' }}
              pt={{
                icon: { className: 'text-xl' } // Increase icon size
              }}
            />
            <Button
              icon="pi pi-github"
              rounded
              text
              size="small"
              onClick={() => window.open('https://github.com/peermart', '_blank')}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              tooltip="View on GitHub"
              tooltipOptions={{ position: 'top' }}
              pt={{
                icon: { className: 'text-xl' } // Increase icon size
              }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
