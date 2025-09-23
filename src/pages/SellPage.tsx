import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText as Input } from 'primereact/inputtext';
import { InputTextarea as Textarea } from 'primereact/inputtextarea';
import { Message } from 'primereact/message';
import { classNames } from 'primereact/utils';
import type React from 'react';
import { useState } from 'react';
import { z } from 'zod';
import { useSeller } from '../context';

// Temporary CardContent wrapper for layout purposes
const CardContent: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className, children }) => (
  <div className={className}>{children}</div>
);

// Zod schema for seller registration validation
const sellerRegistrationSchema = z.object({
  name: z
    .string()
    .min(3, '≥ 3')
    .max(24, '< 24')
    .refine((val) => !/\s/.test(val), { message: 'No spaces' })
    .refine((val) => /^[A-Za-z]/.test(val), { message: 'Start with letter' })
    .refine((val) => /^[A-Za-z0-9]+$/.test(val), { message: 'Only alphanumeric' }),
  twitterUsername: z.string().regex(/^[A-Za-z0-9_]{6,15}$/, 'Invalid'),
  location: z.string().min(3, '≥ 3').max(24, '< 36'),
  phoneNumber: z
    .string()
    .regex(/^\+[1-9][0-9\s\-\(\)]*$/, 'Use International Format')
    .min(10, '≥ 10')
});

type SellerRegistrationForm = z.infer<typeof sellerRegistrationSchema>;

export const SellPage: React.FC = () => {
  const { current: seller, register } = useSeller();
  const [formData, setFormData] = useState({
    name: '',
    twitterUsername: '',
    location: '',
    phoneNumber: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof SellerRegistrationForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Validate single field reactively
    try {
      const fieldSchema = sellerRegistrationSchema.shape[field];
      fieldSchema.parse(value);
      // Clear error only if validation passes
      setErrors((prev) => ({ ...prev, [field]: '' }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Show error immediately as user types
        setErrors((prev) => ({ ...prev, [field]: error.issues[0]?.message || '' }));
      }
    }
  };

  const validateForm = (): boolean => {
    try {
      sellerRegistrationSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err: any) => {
          if (err.path[0]) newErrors[err.path[0] as string] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    const isSuccess = await register(formData);
    if (isSuccess) setFormData({ name: '', twitterUsername: '', location: '', phoneNumber: '' });
    setIsSubmitting(false);
  };
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

      {/* Seller Registration Form - Only show if not already registered */}
      {!seller && (
        <Card className="mb-8 bg-gradient-to-r from-primary/5 to-chart-2/5 border-primary/20">
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex items-start sm:space-x-4 mb-6">
                <div className="bg-primary/10 rounded-full w-12 h-12 hidden sm:flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="pi pi-user-plus text-xl text-primary" />
                </div>
                <div className="sm:flex-1">
                  <h3 className="font-semibold text-foreground mb-1">Seller Registration</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Complete your seller profile to start listing products on the marketplace.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Profile Name *</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Business Username"
                        className={classNames('w-full', { 'p-invalid': errors.name })}
                      />
                      {errors.name && <Message severity="error" text={errors.name} className="mt-1 p-1" />}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">X (Twitter) Username *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-muted-foreground">@</span>
                        </div>
                        <Input
                          value={formData.twitterUsername}
                          onChange={(e) => handleInputChange('twitterUsername', e.target.value)}
                          placeholder="username"
                          className={classNames('w-full pl-8', { 'p-invalid': errors.twitterUsername })}
                        />
                      </div>
                      {errors.twitterUsername && (
                        <Message severity="error" text={errors.twitterUsername} className="mt-1 p-0" />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Location *</label>
                      <Input
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        placeholder="City, State/Country"
                        className={classNames('w-full', { 'p-invalid': errors.location })}
                      />
                      {errors.location && <Message severity="error" text={errors.location} className="mt-1 p-1" />}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
                      <Input
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className={classNames('w-full', { 'p-invalid': errors.phoneNumber })}
                      />
                      {errors.phoneNumber && (
                        <Message severity="error" text={errors.phoneNumber} className="mt-1 p-1" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  loading={isSubmitting}
                  className="bg-primary hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Registering...' : 'Register'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Success message for registered sellers */}
      {seller && (
        <Card className="mb-8 bg-gradient-to-r from-chart-2/5 to-chart-3/5 border-chart-2/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-chart-2/10 rounded-full w-12 h-12 flex items-center justify-center">
                <i className="pi pi-check-circle text-xl text-chart-2" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Welcome, {seller.name}!</h3>
                <p className="text-muted-foreground text-sm">
                  Your seller account is active. You can now list products on the marketplace.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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
                  {['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books', 'Toys'].map((category) => (
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
              { name: 'iPhone 14 Pro - Unlocked', price: '800', status: 'Active', inventory: '2' },
              { name: 'Nike Air Max 270', price: '120', status: 'Sold', inventory: '0' }
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
                        item.status === 'Active'
                          ? 'bg-chart-2/10 text-chart-2 border-chart-2/30'
                          : 'bg-muted text-muted-foreground'
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
  );
};
