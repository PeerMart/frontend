import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { InputText as Input } from "primereact/inputtext"
import { InputTextarea as Textarea } from "primereact/inputtextarea"
import { Badge } from "primereact/badge"
import type React from "react"

// Temporary CardContent wrapper for layout purposes
const CardContent: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className, children }) => (
  <div className={className}>{children}</div>
)
 

export const SellPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 pt-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-foreground mb-6 text-balance">
          <i className="pi pi-tags mr-4 text-primary" />
          Sell Your Products
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
          List your products on our secure marketplace with smart contract escrow protection. Get paid in USDC when
          buyers confirm receipt.
        </p>
      </div>

      {/* Quick Stats for Sellers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="text-center bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-primary mb-2">5%</div>
            <div className="text-muted-foreground">Platform Fee</div>
          </CardContent>
        </Card>
        <Card className="text-center bg-gradient-to-br from-chart-2/5 to-chart-2/10 border-chart-2/20">
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-chart-2 mb-2">3-7 days</div>
            <div className="text-muted-foreground">Average Sale Time</div>
          </CardContent>
        </Card>
        <Card className="text-center bg-gradient-to-br from-chart-3/5 to-chart-3/10 border-chart-3/20">
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-chart-3 mb-2">$450</div>
            <div className="text-muted-foreground">Avg. Sale Price</div>
          </CardContent>
        </Card>
      </div>

      {/* Seller Registration Notice */}
      <Card className="mb-8 bg-gradient-to-r from-primary/5 to-chart-2/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center">
              <i className="pi pi-info-circle text-xl text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Seller Registration Required</h3>
              <p className="text-muted-foreground text-sm">
                Complete seller verification with contact details before listing products.
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90">Register Now</Button>
          </div>
        </CardContent>
      </Card>

      {/* Create Listing Form */}
      <Card className="mb-12">
        <CardContent className="p-8">
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
            <i className="pi pi-plus-circle mr-3 text-primary" />
            Create Product Listing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Product Name</label>
                <Input placeholder="Enter product name" className="w-full" />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                <Textarea placeholder="Describe your product features, condition, etc..." rows={4} className="w-full" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Price (USDC)</label>
                  <Input placeholder="0.00" className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Inventory</label>
                  <Input placeholder="1" type="number" className="w-full" />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Upload Images</label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-muted/20">
                  <i className="pi pi-cloud-upload text-4xl text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Drop product images here or click to browse</p>
                  <p className="text-sm text-muted-foreground mt-2">Supports: JPG, PNG (Max 10MB each)</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                <div className="flex flex-wrap gap-2">
                  {["Electronics", "Fashion", "Home & Garden", "Sports", "Books", "Toys"].map((category) => (
                    <Badge
                      key={category}
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground border-primary/30"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <Button className="gap-2 bg-transparent">
              <i className="pi pi-save" />
              Save Draft
            </Button>
            <Button className="bg-primary hover:bg-primary/90 gap-2">
              <i className="pi pi-check" />
              List Product
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Your Listings */}
      <Card>
        <CardContent className="p-8">
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
            <i className="pi pi-list mr-3 text-chart-2" />
            Your Active Listings
          </h2>

          <div className="space-y-4">
            {[
              { name: "iPhone 14 Pro - Unlocked", price: "800", status: "Active", inventory: "2" },
              { name: "Nike Air Max 270", price: "120", status: "Sold", inventory: "0" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-6 border border-border rounded-lg bg-card hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 via-chart-2/10 to-chart-3/10 rounded-lg flex items-center justify-center">
                    <i className="pi pi-image text-xl text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">Listed 2 days ago • {item.inventory} in stock</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-semibold text-foreground">${item.price} USDC</div>
                    <Badge
                      className={
                        item.status === "Active"
                          ? "bg-chart-2/10 text-chart-2 border-chart-2/30"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button className="p-button-text" size="small">
                      <i className="pi pi-pencil" />
                    </Button>
                    <Button size="small" className="p-button-text text-destructive hover:text-destructive">
                      <i className="pi pi-trash" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}