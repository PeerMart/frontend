export class Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  seller: string;
  sellerName: string;
  description: string;
  inventory: number;
  totalSold: number;

  constructor(input: any) {
    this.id = Number(input[0]);
    this.name = input[1];
    this.imageUrl = input[2];
    this.price = Number(input[3]);
    this.seller = input[4];
    this.sellerName = input[5];
    this.description = input[6];
    this.inventory = Number(input[7]);
    this.totalSold = Number(input[8]);
  }
}
