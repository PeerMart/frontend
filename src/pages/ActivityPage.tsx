import { ethers } from 'ethers';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import type React from 'react';
import { useEffect } from 'react';
import { usePurchases } from '../context';

interface ActivityItem {
  id: number;
  type: string;
  title: string;
  description: string;
  timestamp: string;
  icon: string;
  color: string;
  imageUrl?: string;
  sellerName?: string;
}

export const ActivityPage: React.FC = () => {
  const { current: purchases, fetchPurchases } = usePurchases();

  useEffect(() => {
    fetchPurchases();
  }, []);

  // Convert purchases to activities format
  const activities: ActivityItem[] = purchases.map((purchase) => ({
    id: purchase.productId,
    type: purchase.isSold ? 'completed' : purchase.isPaid ? 'pending' : 'cancelled',
    title: purchase.productName ? `${purchase.productName}` : `Product #${purchase.productId}`,
    description: purchase.isSold
      ? `Purchase completed - ${
          purchase.productPrice ? ethers.formatUnits(purchase.productPrice.toString(), 6) : 'N/A'
        } USDC`
      : purchase.isPaid
      ? `Payment in escrow - awaiting delivery confirmation`
      : `Purchase cancelled or refunded`,
    timestamp: `Product #${purchase.productId}`,
    icon: purchase.isSold ? 'pi pi-check-circle' : purchase.isPaid ? 'pi pi-clock' : 'pi pi-times-circle',
    color: purchase.isSold ? 'chart-2' : purchase.isPaid ? 'chart-3' : 'chart-4',
    imageUrl: purchase.imageUrl,
    sellerName: purchase.sellerName
  }));

  // Add some mock data if no real purchases exist
  const mockActivities: ActivityItem[] =
    purchases.length === 0
      ? [
          {
            id: 0,
            type: 'info',
            title: 'No Purchases Yet',
            description: "You haven't made any purchases yet. Browse the marketplace to find great deals!",
            timestamp: 'Get started',
            icon: 'pi pi-info-circle',
            color: 'primary'
          }
        ]
      : [];

  const allActivities = [...activities, ...mockActivities];

  const getTagVariant = (type: string) => {
    const variants = {
      sale: 'default' as const,
      listing: 'secondary' as const,
      purchase: 'outline' as const,
      refund: 'secondary' as const
    };
    return variants[type as keyof typeof variants] || 'secondary';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 pt-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-foreground mb-6 text-balance">
          <i className="pi pi-chart-line mr-4 text-primary" />
          Transaction History
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
          Track your marketplace activities, sales, purchases, and escrow transactions on the Hedera network.
        </p>
      </div>

      {/* Activity Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <Card className="text-center bg-gradient-to-br from-chart-2/5 to-chart-2/10 border-chart-2/20">
          <div className="pt-6">
            <div className="text-4xl font-bold text-chart-2 mb-2">{purchases.filter((p) => p.isSold).length}</div>
            <div className="text-muted-foreground">Completed Purchases</div>
          </div>
        </Card>
        <Card className="text-center bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <div className="pt-6">
            <div className="text-4xl font-bold text-primary mb-2">{purchases.length}</div>
            <div className="text-muted-foreground">Total Purchases</div>
          </div>
        </Card>
        <Card className="text-center bg-gradient-to-br from-chart-3/5 to-chart-3/10 border-chart-3/20">
          <div className="pt-6">
            <div className="text-4xl font-bold text-chart-3 mb-2">
              {purchases.filter((p) => p.isPaid && !p.isSold).length}
            </div>
            <div className="text-muted-foreground">In Escrow</div>
          </div>
        </Card>
        <Card className="text-center bg-gradient-to-br from-chart-4/5 to-chart-4/10 border-chart-4/20">
          <div className="pt-6">
            <div className="text-4xl font-bold text-chart-4 mb-2">{purchases.filter((p) => !p.isPaid).length}</div>
            <div className="text-muted-foreground">Cancelled/Refunded</div>
          </div>
        </Card>
      </div>

      {/* Filter Buttons */}
      <Card className="mb-8">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Filter Activities</h2>
          <div className="flex flex-wrap gap-2">
            <Button outlined size="small">
              All
            </Button>
            <Button outlined size="small" className="gap-2 bg-transparent">
              <i className="pi pi-check-circle" />
              Sales
            </Button>
            <Button outlined size="small" className="gap-2 bg-transparent">
              <i className="pi pi-shopping-cart" />
              Purchases
            </Button>
            <Button outlined size="small" className="gap-2 bg-transparent">
              <i className="pi pi-plus-circle" />
              Listings
            </Button>
            <Button outlined size="small" className="gap-2 bg-transparent">
              <i className="pi pi-shield" />
              Escrow
            </Button>
          </div>
        </div>
      </Card>

      {/* Activity Timeline */}
      <Card>
        <div className="p-8">
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
            <i className="pi pi-clock mr-3 text-primary" />
            Recent Activity
          </h2>

          <div className="space-y-6">
            {allActivities.map((item) => (
              <div key={item.id} className="flex items-start space-x-4 pb-6 border-b border-border last:border-b-0">
                <div className="flex items-center space-x-4">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full bg-${item.color}/10 border-2 border-${item.color}/20`}
                  >
                    <i className={`${item.icon} text-lg text-${item.color}`} />
                  </div>

                  {/* Product Image */}
                  {item.imageUrl && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <Badge className={`badge-${getTagVariant(item.type)}`}>
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </Badge>
                    </div>
                    <Button size="small" className="p-button-text">
                      <i className="pi pi-external-link" />
                    </Button>
                  </div>
                  <p className="text-muted-foreground mb-1">{item.description}</p>
                  {item.sellerName && (
                    <p className="text-sm text-muted-foreground">
                      Seller: <span className="font-medium">{item.sellerName}</span>
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground">{item.timestamp}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Refresh */}
          <div className="text-center mt-8">
            <Button outlined className="gap-2 bg-transparent" onClick={fetchPurchases}>
              <i className="pi pi-refresh" />
              Refresh Activities
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
