import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { Divider as Separator } from "primereact/divider"
import type React from "react"

export const AboutPage: React.FC = () => {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      image: "pi pi-user",
      description: "E-commerce veteran with 10+ years in marketplace platforms",
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      image: "pi pi-user",
      description: "Smart contract expert specializing in Hedera DLT",
    },
    {
      name: "Mike Rodriguez",
      role: "Head of Security",
      image: "pi pi-user",
      description: "Fraud prevention specialist and blockchain security expert",
    },
  ]

  const features = [
    {
      icon: "pi pi-shield",
      title: "Fraud-Proof Marketplace",
      description: "Smart contracts hold payments until buyers confirm receipt, eliminating fraud",
    },
    {
      icon: "pi pi-bolt",
      title: "Instant Settlements",
      description: "Fast USDC transactions on Hedera with minimal fees and energy usage",
    },
    {
      icon: "pi pi-users",
      title: "Seller Verification",
      description: "Comprehensive seller registration and reputation system for trust",
    },
    {
      icon: "pi pi-globe",
      title: "Global Commerce",
      description: "Connect buyers and sellers worldwide with blockchain-powered security",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto p-6 pt-16">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-foreground mb-6 text-balance">
          <i className="pi pi-info-circle mr-4 text-primary" />
          About PeerMart
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
          The world's first fraud-proof e-commerce marketplace powered by smart contracts. We're revolutionizing online
          shopping by eliminating fraud and building trust between buyers and sellers.
        </p>
      </div>

      {/* Mission Statement */}
      <Card className="mb-12">
        <div className="p-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            To create the safest online shopping experience by using smart contract  to protect every transaction.
            We eliminate fraud, build seller accountability, and ensure buyers get exactly what they pay for.
          </p>
        </div>
      </Card>

      {/* Key Features */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-foreground text-center mb-8">Why Choose PeerMart?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center h-full hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <i className={`${feature.icon} text-2xl text-primary`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <Card className="mb-12">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">Platform Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">25K+</div>
              <div className="text-muted-foreground">Active Shoppers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-chart-2 mb-2">150K+</div>
              <div className="text-muted-foreground">Products Sold</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-chart-3 mb-2">$5M+</div>
              <div className="text-muted-foreground">USDC Volume</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-chart-4 mb-2">99.8%</div>
              <div className="text-muted-foreground">Fraud Prevention</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Team Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-foreground text-center mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="bg-gradient-to-br from-primary/10 via-chart-2/10 to-chart-3/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                  <i className={`${member.image} text-3xl text-muted-foreground`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact/Community */}
      <Card>
        <div className="p-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Join Our Marketplace</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with thousands of verified sellers and secure shoppers in our growing e-commerce community.
          </p>
          <div className="flex justify-center space-x-4 mb-8">
            <Button className="gap-2 border border-primary text-primary hover:bg-primary/10">
              <i className="pi pi-discord" />
              Discord
            </Button>
            <Button className="gap-2 border border-primary text-primary hover:bg-primary/10">
              <i className="pi pi-twitter" />
              Twitter
            </Button>
            <Button className="gap-2 border border-primary text-primary hover:bg-primary/10">
              <i className="pi pi-send" />
              Telegram
            </Button>
          </div>

          <Separator className="my-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-foreground mb-3">Contact Us</h3>
              <p className="text-muted-foreground flex items-center justify-center gap-2">
                <i className="pi pi-envelope" />
                hello@peermart.io
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Support</h3>
              <p className="text-muted-foreground flex items-center justify-center gap-2">
                <i className="pi pi-question-circle" />
                support@peermart.io
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
