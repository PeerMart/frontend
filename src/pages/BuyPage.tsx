import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { ProgressSpinner } from 'primereact/progressspinner';
import type React from 'react';
import { useCallback, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useBuyer } from '../context/BuyerContext';

// Temporary CardContent wrapper for layout purposes
const CardContent: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
  <div className={className}>{children}</div>
);

export const BuyPage: React.FC = () => {
  const { products, loading, buy } = useBuyer();
  const { wallet } = useAuth();
  const [purchasingProduct, setPurchasingProduct] = useState<number | null>(null);
  
  // IPFS gateways for fallback
  const ipfsGateways = [
    'https://dweb.link/ipfs/',
    'https://cloudflare-ipfs.com/ipfs/',
    'https://gateway.pinata.cloud/ipfs/',
    'https://ipfs.io/ipfs/'
  ];

  // Helper function to convert IPFS hash to gateway URL
  const getIpfsUrl = useCallback((ipfsHash: string, gatewayIndex: number = 0) => {
    if (!ipfsHash) return '';
    // Remove 'ipfs://' prefix if present
    const hash = ipfsHash.replace('https://ipfs.io/ipfs/', '');
    return `${ipfsGateways[gatewayIndex] || ipfsGateways[0]}${hash}`;
  }, []);

  // Component for IPFS image with fallback
  const IPFSImage: React.FC<{
    hash: string;
    alt: string;
    className?: string;
    onLoad?: () => void;
    onError?: () => void;
  }> = ({ hash, alt, className, onLoad, onError }) => {
    const [gatewayIndex, setGatewayIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => {
      setIsLoading(false);
      setHasError(false);
      onLoad?.();
    };

    const handleError = () => {
      if (gatewayIndex < ipfsGateways.length - 1) {
        // Try next gateway
        setGatewayIndex((prev) => prev + 1);
      } else {
        // All gateways failed
        setIsLoading(false);
        setHasError(true);
        onError?.();
      }
    };

    if (hasError) {
      return (
        <i className="pi pi-image text-6xl text-muted-foreground group-hover:scale-110 transition-transform duration-300" />
      );
    }

    return (
      <>
        {isLoading && <i className="pi pi-spinner pi-spin text-4xl text-muted-foreground absolute" />}
        <img
          src={getIpfsUrl(hash, gatewayIndex)}
          alt={alt}
          className={className}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s'
          }}
        />
      </>
    );
  };

  const handlePurchase = async (productId: number, price: number) => {
    setPurchasingProduct(productId);
    try {
      await buy(productId, price);
    } finally {
      setPurchasingProduct(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 pt-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-foreground mb-6 text-balance">
          <i className="pi pi-shopping-cart mr-4 text-primary" />
          Secure E-Commerce Marketplace
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
          Shop with confidence on Hedera's first fraud-proof marketplace. Smart contracts hold payments in escrow until
          you confirm receipt, protecting both buyers and sellers.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="text-center bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-primary mb-2">{products.length}</div>
            <div className="text-muted-foreground">Products Available</div>
          </CardContent>
        </Card>
        <Card className="text-center bg-gradient-to-br from-chart-2/5 to-chart-2/10 border-chart-2/20">
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-chart-2 mb-2">
              {products.reduce((sum, product) => sum + product.totalSold, 0)}
            </div>
            <div className="text-muted-foreground">Products Sold</div>
          </CardContent>
        </Card>
        <Card className="text-center bg-gradient-to-br from-chart-3/5 to-chart-3/10 border-chart-3/20">
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-chart-3 mb-2">100%</div>
            <div className="text-muted-foreground">Secure Transactions</div>
          </CardContent>
        </Card>
      </div>

      {/* Products */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
          <i className="pi pi-shopping-cart mr-3 text-primary" />
          Latest Products
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <ProgressSpinner />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <i className="pi pi-inbox text-6xl text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Products Available</h3>
            <p className="text-muted-foreground">Be the first to list a product on our marketplace!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/30"
              >
                <CardContent className="p-0">
                  <div className="aspect-square bg-gradient-to-br from-primary/10 via-chart-2/10 to-chart-3/10 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                    {product.imageUrl ? (
                      <IPFSImage
                        hash={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <i className="pi pi-image text-6xl text-muted-foreground group-hover:scale-110 transition-transform duration-300" />
                    )}
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-background/80 backdrop-blur-sm">Verified Seller</Badge>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2 truncate">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">Sold by {product.sellerName}</p>
                      {product.description && (
                        <p
                          className="text-sm text-muted-foreground mt-2 overflow-hidden"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                          }}
                        >
                          {product.description}
                        </p>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Badge className="text-primary border-primary/30 border border-solid bg-transparent">
                          ${(product.price / 1000000).toFixed(2)} USDC
                        </Badge>
                        <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/30">
                          {product.inventory} in stock
                        </Badge>
                      </div>
                      <Button
                        size="small"
                        className="bg-primary hover:bg-primary/90"
                        onClick={() => handlePurchase(product.id, product.price)}
                        disabled={!wallet || product.inventory === 0 || purchasingProduct === product.id}
                        loading={purchasingProduct === product.id}
                      >
                        {!wallet ? 'Connect Wallet' : purchasingProduct === product.id ? 'Buying...' : 'Buy'}
                      </Button>
                    </div>
                    {product.totalSold > 0 && (
                      <div className="text-xs text-muted-foreground">{product.totalSold} sold</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
          <i className="pi pi-th-large mr-3 text-primary" />
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Electronics', icon: 'pi pi-mobile', color: 'primary' },
            { name: 'Fashion', icon: 'pi pi-shopping-bag', color: 'chart-2' },
            { name: 'Home & Garden', icon: 'pi pi-home', color: 'chart-3' },
            { name: 'Sports', icon: 'pi pi-heart', color: 'chart-4' }
          ].map((category) => (
            <Card
              key={category.name}
              className="group text-center hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 border-border/50 hover:border-primary/30"
            >
              <CardContent className="py-8">
                <div
                  className={`bg-${category.color}/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <i className={`${category.icon} text-3xl text-${category.color}`} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{category.name}</h3>
                <p className="text-sm text-muted-foreground">Browse {category.name.toLowerCase()}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Trust Indicators Section */}
      <div className="mt-16 bg-gradient-to-r from-primary/5 to-chart-2/5 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-foreground text-center mb-8">Why Shop with PeerMart?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <i className="pi pi-shield text-3xl text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Escrow Protection</h3>
            <p className="text-muted-foreground text-sm">Your payment is held safely until you confirm receipt</p>
          </div>
          <div className="text-center">
            <div className="bg-chart-2/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <i className="pi pi-users text-3xl text-chart-2" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Verified Sellers</h3>
            <p className="text-muted-foreground text-sm">All sellers are verified with reputation scores</p>
          </div>
          <div className="text-center">
            <div className="bg-chart-3/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <i className="pi pi-dollar text-3xl text-chart-3" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">USDC Payments</h3>
            <p className="text-muted-foreground text-sm">Stable, fast payments on Hedera network</p>
          </div>
        </div>
      </div>
    </div>
  );
};
