export class Seller {
  name: string;
  profileURI: string;
  confirmedPurchases: number;
  canceledPurchases: number;
  reportedPurchases: number;
  location: string;
  phoneNumber: string;

  constructor(input: any) {
    this.name = input[0];
    this.profileURI = input[1];
    this.confirmedPurchases = Number(input[2]);
    this.canceledPurchases = Number(input[3]);
    this.reportedPurchases = Number(input[4]);
    this.location = `${input[5]}`;
    this.phoneNumber = input[6];
  }
}
