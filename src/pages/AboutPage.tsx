import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import React from 'react';

export const AboutPage: React.FC = () => {
  const teamMembers = [
    {
      name: 'Alex Johnson',
      role: 'Founder & CEO',
      image: 'pi pi-user',
      description: 'Blockchain enthusiast with 8+ years in Web3'
    },
    {
      name: 'Sarah Chen',
      role: 'CTO',
      image: 'pi pi-user',
      description: 'Full-stack developer specializing in Hedera'
    },
    {
      name: 'Mike Rodriguez',
      role: 'Head of Design',
      image: 'pi pi-user',
      description: 'UX/UI designer focused on Web3 experiences'
    }
  ];

  const features = [
    {
      icon: 'pi pi-shield',
      title: 'Secure & Decentralized',
      description: 'Built on Hedera Hashgraph for maximum security and energy efficiency'
    },
    {
      icon: 'pi pi-bolt',
      title: 'Fast Transactions',
      description: "Near-instant settlement with minimal fees using Hedera's consensus"
    },
    {
      icon: 'pi pi-users',
      title: 'Community Driven',
      description: 'Governed by our community of creators, collectors, and traders'
    },
    {
      icon: 'pi pi-globe',
      title: 'Global Marketplace',
      description: 'Connect with creators and collectors from around the world'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          <i className="pi pi-info-circle mr-4 text-blue-600" />
          About PeerMart
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          The premier decentralized marketplace for digital assets on the Hedera network. We're building the future of
          peer-to-peer trading with cutting-edge blockchain technology.
        </p>
      </div>

      {/* Mission Statement */}
      <Card className="mb-12">
        <div className="p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            To democratize access to digital asset trading by providing a secure, efficient, and user-friendly
            marketplace that empowers creators and collectors to connect directly without intermediaries.
          </p>
        </div>
      </Card>

      {/* Key Features */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Why Choose PeerMart?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center h-full">
              <div className="p-6">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <i className={`${feature.icon} text-2xl text-blue-600 dark:text-blue-400`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <Card className="mb-12">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Platform Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600 dark:text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">50K+</div>
              <div className="text-gray-600 dark:text-gray-400">Items Traded</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">2M+</div>
              <div className="text-gray-600 dark:text-gray-400">HBAR Volume</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">99.9%</div>
              <div className="text-gray-600 dark:text-gray-400">Uptime</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Team Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="text-center">
              <div className="p-6">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                  <i className={`${member.image} text-3xl text-gray-600 dark:text-gray-400`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{member.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{member.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <Card className="mb-12">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Built With Cutting-Edge Technology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <i className="pi pi-cog mr-3 text-blue-600" />
                Blockchain & Security
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Hedera Hashgraph for consensus</li>
                <li>• Smart contracts for secure transactions</li>
                <li>• IPFS for decentralized storage</li>
                <li>• End-to-end encryption</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <i className="pi pi-code mr-3 text-green-600" />
                Frontend & UX
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• React with TypeScript</li>
                <li>• PrimeReact component library</li>
                <li>• Tailwind CSS for styling</li>
                <li>• Responsive mobile-first design</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* Roadmap */}
      <Card className="mb-12">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Roadmap</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-green-500 rounded-full w-3 h-3 mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Q1 2025 - Platform Launch</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Core marketplace functionality and wallet integration
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-500 rounded-full w-3 h-3 mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Q2 2025 - Advanced Features</h3>
                <p className="text-gray-600 dark:text-gray-400">Auction system, bulk listings, and enhanced search</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-gray-400 rounded-full w-3 h-3 mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Q3 2025 - Mobile App</h3>
                <p className="text-gray-600 dark:text-gray-400">Native mobile applications for iOS and Android</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-gray-400 rounded-full w-3 h-3 mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Q4 2025 - Governance Token</h3>
                <p className="text-gray-600 dark:text-gray-400">Community governance and rewards system</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Contact/Community */}
      <Card>
        <div className="p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Join Our Community</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Stay updated with the latest developments and connect with fellow creators and collectors.
          </p>
          <div className="flex justify-center space-x-4">
            <Button label="Discord" icon="pi pi-discord" outlined className="mb-2" />
            <Button label="Twitter" icon="pi pi-twitter" outlined className="mb-2" />
            <Button label="Telegram" icon="pi pi-send" outlined className="mb-2" />
          </div>

          <Divider />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Contact Us</h3>
              <p className="text-gray-600 dark:text-gray-400">
                <i className="pi pi-envelope mr-2" />
                hello@peermart.io
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Support</h3>
              <p className="text-gray-600 dark:text-gray-400">
                <i className="pi pi-question-circle mr-2" />
                support@peermart.io
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
