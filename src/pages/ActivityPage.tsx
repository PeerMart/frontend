import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Timeline } from 'primereact/timeline';
import React from 'react';

export const ActivityPage: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'sale',
      title: 'Digital Art #123 Sold',
      description: 'Sold for 150 HBAR',
      timestamp: '2 hours ago',
      icon: 'pi pi-shopping-cart',
      color: 'green'
    },
    {
      id: 2,
      type: 'listing',
      title: 'New Item Listed',
      description: 'Music NFT #456 listed for 75 HBAR',
      timestamp: '5 hours ago',
      icon: 'pi pi-plus-circle',
      color: 'blue'
    },
    {
      id: 3,
      type: 'offer',
      title: 'Offer Received',
      description: 'New offer of 120 HBAR on Digital Art #789',
      timestamp: '1 day ago',
      icon: 'pi pi-handshake',
      color: 'orange'
    },
    {
      id: 4,
      type: 'purchase',
      title: 'Purchase Completed',
      description: 'Bought Collectible #321 for 200 HBAR',
      timestamp: '2 days ago',
      icon: 'pi pi-check-circle',
      color: 'purple'
    }
  ];

  const getColorClass = (color: string) => {
    const colors = {
      green: 'text-green-600',
      blue: 'text-blue-600',
      orange: 'text-orange-600',
      purple: 'text-purple-600'
    };
    return colors[color as keyof typeof colors] || 'text-gray-600';
  };

  const getTagSeverity = (type: string): 'success' | 'info' | 'warning' | 'secondary' | 'danger' | 'contrast' => {
    const severities = {
      sale: 'success' as const,
      listing: 'info' as const,
      offer: 'warning' as const,
      purchase: 'secondary' as const
    };
    return severities[type as keyof typeof severities] || 'info';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          <i className="pi pi-chart-line mr-3 text-purple-600" />
          Activity Feed
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Track your marketplace activities, sales, purchases, and listings
        </p>
      </div>

      {/* Activity Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">12</div>
          <div className="text-gray-600 dark:text-gray-400">Items Sold</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">8</div>
          <div className="text-gray-600 dark:text-gray-400">Items Bought</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">5</div>
          <div className="text-gray-600 dark:text-gray-400">Active Listings</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
          <div className="text-gray-600 dark:text-gray-400">Pending Offers</div>
        </Card>
      </div>

      {/* Filter Buttons */}
      <Card className="mb-8">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filter Activities</h2>
          <div className="flex flex-wrap gap-2">
            <Button label="All" size="small" outlined />
            <Button label="Sales" size="small" outlined icon="pi pi-shopping-cart" />
            <Button label="Purchases" size="small" outlined icon="pi pi-check-circle" />
            <Button label="Listings" size="small" outlined icon="pi pi-plus-circle" />
            <Button label="Offers" size="small" outlined icon="pi pi-handshake" />
          </div>
        </div>
      </Card>

      {/* Activity Timeline */}
      <Card>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <i className="pi pi-clock mr-3 text-blue-600" />
            Recent Activity
          </h2>

          <Timeline
            value={activities}
            content={(item) => (
              <div className="flex items-start justify-between w-full">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                    <Tag
                      value={item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      severity={getTagSeverity(item.type)}
                    />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">{item.description}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">{item.timestamp}</p>
                </div>
                <div className="ml-4">
                  <Button icon="pi pi-external-link" rounded text size="small" tooltip="View Details" />
                </div>
              </div>
            )}
            marker={(item) => (
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-gray-800 border-2 border-current ${getColorClass(
                  item.color
                )}`}
              >
                <i className={`${item.icon} text-sm`} />
              </div>
            )}
            className="w-full"
          />

          {/* Load More */}
          <div className="text-center mt-8">
            <Button label="Load More Activities" outlined icon="pi pi-refresh" />
          </div>
        </div>
      </Card>

      {/* Statistics Card */}
      <Card className="mt-8">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <i className="pi pi-chart-bar mr-3 text-green-600" />
            Performance Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Sales Performance</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Sales Volume</span>
                  <span className="font-semibold">1,850 HBAR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Average Sale Price</span>
                  <span className="font-semibold">154 HBAR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Success Rate</span>
                  <span className="font-semibold text-green-600">87%</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Market Activity</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Profile Views</span>
                  <span className="font-semibold">2,340</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Item Views</span>
                  <span className="font-semibold">8,720</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Conversion Rate</span>
                  <span className="font-semibold text-blue-600">12.5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
