import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Tag } from 'primereact/tag';
import React from 'react';

export const SellPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          <i className="pi pi-tags mr-3 text-green-600" />
          Sell Your Digital Assets
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          List your NFTs and digital collectibles on the Hedera network marketplace
        </p>
      </div>

      {/* Quick Stats for Sellers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">2.5%</div>
          <div className="text-gray-600 dark:text-gray-400">Platform Fee</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">24h</div>
          <div className="text-gray-600 dark:text-gray-400">Average Sale Time</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">₳1.2K</div>
          <div className="text-gray-600 dark:text-gray-400">Avg. Sale Price</div>
        </Card>
      </div>

      {/* Create Listing Form */}
      <Card className="mb-8">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <i className="pi pi-plus-circle mr-3 text-green-600" />
            Create New Listing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Item Name</label>
                <InputText placeholder="Enter item name" className="w-full" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <InputTextarea placeholder="Describe your item..." rows={4} className="w-full" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price (HBAR)</label>
                <InputText placeholder="0.00" className="w-full" />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Upload File</label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                  <i className="pi pi-cloud-upload text-4xl text-gray-400 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">Drop your file here or click to browse</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    Supports: JPG, PNG, GIF, MP4 (Max 50MB)
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                <div className="flex flex-wrap gap-2">
                  {['Art', 'Music', 'Gaming', 'Collectibles', 'Photography'].map((category) => (
                    <Tag
                      key={category}
                      value={category}
                      className="cursor-pointer hover:bg-blue-600 hover:text-white"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <Button label="Save Draft" outlined icon="pi pi-save" />
            <Button label="List Item" icon="pi pi-check" className="bg-green-600 hover:bg-green-700" />
          </div>
        </div>
      </Card>

      {/* Your Listings */}
      <Card>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <i className="pi pi-list mr-3 text-blue-600" />
            Your Active Listings
          </h2>

          <div className="space-y-4">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center">
                    <i className="pi pi-image text-xl text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Digital Art #{item}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Listed 2 days ago</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-semibold text-gray-900 dark:text-white">150 HBAR</div>
                    <Tag value="Active" severity="success" />
                  </div>
                  <div className="flex space-x-2">
                    <Button icon="pi pi-pencil" rounded text size="small" tooltip="Edit" />
                    <Button icon="pi pi-trash" rounded text severity="danger" size="small" tooltip="Remove" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
