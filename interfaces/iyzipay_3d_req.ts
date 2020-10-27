import { BasketItem } from "./basket_item";
import { BillingAddress } from "./billing_address";
import { Buyer } from "./buyer";
import { CreditCard } from "./credit_card";
import { ShippingAddress } from "./shipping_address";

export interface IyziPay3D {
  conversationId: string;
  locale: any;
  price: string;
  paidPrice: string;
  currency: any;
  paymentGroup: string;
  paymentCard: CreditCard;
  buyer: Buyer;
  callbackUrl: string;
  shippingAddress: ShippingAddress;
  billingAddress: BillingAddress;
  basketItems: BasketItem[];
}
