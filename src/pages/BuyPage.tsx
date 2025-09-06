import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import React from 'react';

export const BuyPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          <i className="pi pi-shopping-cart mr-3 text-blue-600" />
          Marketplace
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover unique digital assets and NFTs from verified sellers on the Hedera network
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">1,234</div>
          <div className="text-gray-600 dark:text-gray-400">Items Listed</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">567</div>
          <div className="text-gray-600 dark:text-gray-400">Sales This Week</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">89</div>
          <div className="text-gray-600 dark:text-gray-400">Active Sellers</div>
        </Card>
      </div>

      {/* Featured Items Placeholder */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg mb-4 flex items-center justify-center">
                <i className="pi pi-image text-4xl text-gray-400" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">Digital Art #{item}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Unique digital artwork created by verified artist
                </p>
                <div className="flex justify-between items-center">
                  <Tag value="100 HBAR" severity="success" />
                  <Tag value="Available" severity="info" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Art', 'Music', 'Gaming', 'Collectibles'].map((category) => (
            <Card key={category} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="py-8">
                <i className="pi pi-star text-3xl text-blue-600 mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white">{category}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Explore {category.toLowerCase()}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
