import { formatUnits, parseUnits } from 'ethers';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import type { MenuItem } from 'primereact/menuitem';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useAuth, useContract, useToast } from '../context';

interface WalletButtonProps {
  mobile?: boolean;
  className?: string;
}

export const WalletButton: React.FC<WalletButtonProps> = ({ mobile = false, className = '' }) => {
  const { isConnected, wallet, connectWallet, disconnectWallet, isConnecting, error } = useAuth();
  const { read, write } = useContract();
  const walletMenuRef = useRef<Menu>(null);
  const toast = useToast();
  const [isMinting, setIsMinting] = useState(false);
  const [usdcBalance, setUsdcBalance] = useState<string>('0');

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const fetchUsdcBalance = async () => {
    if (!wallet?.address) return;

    try {
      const balance = await read({
        method: 'balanceOf',
        args: [wallet.address],
        isUsdc: true
      });

      if (balance !== null && balance !== undefined) {
        // Format balance from 6 decimals to readable format
        const formattedBalance = formatUnits(balance, 6);
        setUsdcBalance(parseFloat(formattedBalance).toFixed(2));
      } else {
        setUsdcBalance('0');
      }
    } catch (error) {
      console.error('Error fetching USDC balance:', error);
      setUsdcBalance('0');
    }
  };

  const handleMintUsdc = async () => {
    if (!wallet?.address) return;

    setIsMinting(true);
    try {
      // Mint 100 USDC (with 6 decimals)
      const amount = parseUnits('100', 6);
      const result = await write({
        method: 'mint',
        args: [wallet.address, amount],
        isUsdc: true
      });

      if (result) {
        toast.show({
          severity: 'success',
          summary: 'Tokens Minted',
          detail: '100 USDC has been minted to your wallet',
          life: 3000
        });
        // Refresh USDC balance after minting
        fetchUsdcBalance();
      }
    } catch (err) {
      toast.show({
        severity: 'error',
        summary: 'Mint Failed',
        detail: 'Failed to mint USDC tokens',
        life: 5000
      });
    } finally {
      setIsMinting(false);
    }
  };

  const walletMenuItems: MenuItem[] = [
    {
      label: `${parseFloat(wallet?.balance || '0').toFixed(4)} HBAR`,
      icon: 'pi pi-circle-fill',
      disabled: true,
      className: 'text-muted-foreground pointer-events-none'
    },
    {
      label: `${usdcBalance} USDC`,
      icon: 'pi pi-circle-fill',
      disabled: true,
      className: 'text-muted-foreground pointer-events-none'
    },
    {
      separator: true
    },
    {
      label: 'Copy Address',
      icon: 'pi pi-copy',
      command: () => {
        if (wallet?.address) {
          navigator.clipboard.writeText(wallet.address);
          toast.show({
            severity: 'success',
            summary: 'Copied',
            detail: 'Address copied to clipboard',
            life: 2000
          });
        }
      }
    },
    {
      label: 'Mint 100 USDC',
      icon: 'pi pi-plus-circle',
      disabled: isMinting,
      command: handleMintUsdc
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
      toast.show({
        severity: 'error',
        summary: 'Connection Failed',
        detail: error || 'Failed to connect wallet',
        life: 5000
      });
    }
  };

  // Fetch USDC balance when wallet changes
  useEffect(() => {
    if (wallet?.address) {
      fetchUsdcBalance();
    } else {
      setUsdcBalance('0');
    }
  }, [wallet?.address, read]);

  if (mobile) {
    return (
      <div className={`border-t border-border pt-4 mb-6 ${className}`}>
        <label className="block text-sm font-medium text-foreground mb-3">Wallet</label>
        {isConnected && wallet ? (
          <div className="space-y-3">
            <div className="p-3 bg-muted rounded-md">
              <div className="text-sm text-muted-foreground">Connected</div>
              <div className="font-mono text-sm">{formatAddress(wallet.address)}</div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{parseFloat(wallet.balance).toFixed(4)} HBAR</span>
                <span>{usdcBalance} USDC</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <Button
                  size="small"
                  className="flex-1 gap-2"
                  onClick={() => {
                    if (wallet?.address) {
                      navigator.clipboard.writeText(wallet.address);
                      toast.show({
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
              <Button
                size="small"
                className="w-full gap-2"
                onClick={handleMintUsdc}
                loading={isMinting}
                severity="help"
              >
                <i className="pi pi-plus-circle" />
                Mint 100 USDC
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
    );
  }

  return (
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
  );
};
