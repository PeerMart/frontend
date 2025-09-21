import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import type { MenuItem } from 'primereact/menuitem';
import { Toast } from 'primereact/toast';
import type React from 'react';
import { useRef } from 'react';
import { useAuth } from '../context/AuthContext';

interface WalletButtonProps {
  mobile?: boolean;
  className?: string;
}

export const WalletButton: React.FC<WalletButtonProps> = ({ mobile = false, className = '' }) => {
  const { isConnected, wallet, connectWallet, disconnectWallet, isConnecting, error } = useAuth();
  const walletMenuRef = useRef<Menu>(null);
  const toastRef = useRef<Toast>(null);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

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

  if (mobile) {
    return (
      <>
        <Toast ref={toastRef} />
        <div className={`border-t border-border pt-4 mb-6 ${className}`}>
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
      </>
    );
  }

  return (
    <>
      <Toast ref={toastRef} />
      <div className={className}>
        {isConnected && wallet ? (
          <>
            <Menu ref={walletMenuRef} model={walletMenuItems} popup className="mt-2" />
            <Button size="small" onClick={(e) => walletMenuRef.current?.toggle(e)} className="gap-2" severity="success">
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
    </>
  );
};
