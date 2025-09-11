import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { Badge } from "primereact/badge"
import type React from "react"

export const ActivityPage: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: "sale",
      title: "iPhone 14 Pro Sold",
      description: "Payment confirmed - $800 USDC received",
      timestamp: "2 hours ago",
      icon: "pi pi-check-circle",
      color: "chart-2",
    },
    {
      id: 2,
      type: "listing",
      title: "New Product Listed",
      description: "Nike Air Max 270 listed for $120 USDC",
      timestamp: "5 hours ago",
      icon: "pi pi-plus-circle",
      color: "primary",
    },
    {
      id: 3,
      type: "purchase",
      title: "MacBook Pro Purchased",
      description: "Payment in escrow - awaiting delivery confirmation",
      timestamp: "1 day ago",
      icon: "pi pi-shopping-cart",
      color: "chart-3",
    },
    {
      id: 4,
      type: "refund",
      title: "Purchase Cancelled",
      description: "Refund processed for Samsung Galaxy S23 - $650 USDC",
      timestamp: "2 days ago",
      icon: "pi pi-undo",
      color: "chart-4",
    },
  ]

  const getTagVariant = (type: string) => {
    const variants = {
      sale: "default" as const,
      listing: "secondary" as const,
      purchase: "outline" as const,
      refund: "secondary" as const,
    }
    return variants[type as keyof typeof variants] || "secondary"
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
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
            <div className="text-4xl font-bold text-chart-2 mb-2">23</div>
            <div className="text-muted-foreground">Products Sold</div>
          </div>
        </Card>
        <Card className="text-center bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <div className="pt-6">
            <div className="text-4xl font-bold text-primary mb-2">15</div>
            <div className="text-muted-foreground">Products Bought</div>
          </div>
        </Card>
        <Card className="text-center bg-gradient-to-br from-chart-3/5 to-chart-3/10 border-chart-3/20">
          <div className="pt-6">
            <div className="text-4xl font-bold text-chart-3 mb-2">7</div>
            <div className="text-muted-foreground">Active Listings</div>
          </div>
        </Card>
        <Card className="text-center bg-gradient-to-br from-chart-4/5 to-chart-4/10 border-chart-4/20">
          <div className="pt-6">
            <div className="text-4xl font-bold text-chart-4 mb-2">2</div>
            <div className="text-muted-foreground">In Escrow</div>
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
            {activities.map((item, index) => (
              <div key={item.id} className="flex items-start space-x-4 pb-6 border-b border-border last:border-b-0">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full bg-${item.color}/10 border-2 border-${item.color}/20`}
                >
                  <i className={`${item.icon} text-lg text-${item.color}`} />
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
                  <p className="text-sm text-muted-foreground">{item.timestamp}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button outlined className="gap-2 bg-transparent">
              <i className="pi pi-refresh" />
              Load More Activities
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
