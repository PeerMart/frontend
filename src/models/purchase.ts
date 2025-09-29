export class Purchase {
  productId: number;
  buyer: string;
  isPaid: boolean;
  isSold: boolean;
  productName?: string;
  productPrice?: number;
  sellerName?: string;
  imageUrl?: string;

  constructor(input: any, productInfo?: any) {
    this.productId = Number(input[0]);
    this.buyer = input[1];
    this.isPaid = input[2];
    this.isSold = input[3];

    // Add product information if provided
    if (productInfo) {
      this.productName = productInfo.name;
      this.productPrice = Number(productInfo.price);
      this.sellerName = productInfo.sellerName;
      this.imageUrl = productInfo.imageUrl;
    }
  }
}
