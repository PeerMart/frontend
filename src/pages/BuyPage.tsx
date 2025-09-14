import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { Badge } from "primereact/badge"
import type React from "react"

// Temporary CardContent wrapper for layout purposes
const CardContent: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
  <div className={className}>{children}</div>
)


export const BuyPage: React.FC = () => {
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
            <div className="text-4xl font-bold text-primary mb-2">12,450</div>
            <div className="text-muted-foreground">Products Listed</div>
          </CardContent>
        </Card>
        <Card className="text-center bg-gradient-to-br from-chart-2/5 to-chart-2/10 border-chart-2/20">
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-chart-2 mb-2">3,267</div>
            <div className="text-muted-foreground">Successful Orders</div>
          </CardContent>
        </Card>
        <Card className="text-center bg-gradient-to-br from-chart-3/5 to-chart-3/10 border-chart-3/20">
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-chart-3 mb-2">99.8%</div>
            <div className="text-muted-foreground">Fraud Prevention Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Items */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
          <i className="pi pi-star mr-3 text-primary" />
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "iPhone 15 Pro Max", price: "1,200", category: "Electronics", seller: "TechStore Pro" },
            { name: "Nike Air Jordan 1", price: "180", category: "Fashion", seller: "SneakerHub" },
            { name: "MacBook Pro M3", price: "2,500", category: "Electronics", seller: "AppleDealer" },
          ].map((item, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/30"
            >
              <CardContent className="p-0">
                <div className="aspect-square bg-gradient-to-br from-primary/10 via-chart-2/10 to-chart-3/10 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                  <i className="pi pi-image text-6xl text-muted-foreground group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-background/80 backdrop-blur-sm">
                      Verified Seller
                    </Badge>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Sold by {item.seller} • {item.category}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Badge className="text-primary border-primary/30 border border-solid bg-transparent">
                        ${item.price} USDC
                      </Badge>
                      <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/30">In Stock</Badge>
                    </div>
                    <Button size="small" className="bg-primary hover:bg-primary/90">
                      Buy Secure
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
          <i className="pi pi-th-large mr-3 text-primary" />
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Electronics", icon: "pi pi-mobile", color: "primary" },
            { name: "Fashion", icon: "pi pi-shopping-bag", color: "chart-2" },
            { name: "Home & Garden", icon: "pi pi-home", color: "chart-3" },
            { name: "Sports", icon: "pi pi-heart", color: "chart-4" },
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
  )
}
