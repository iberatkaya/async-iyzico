import { BasketItem } from "./iyzico/basket_item";
import { BillingAddress } from "./iyzico/billing_address";
import { ShippingAddress } from "./iyzico/shipping_address";
import { CreditCard } from "./iyzico/credit_card";
import { Buyer } from "./iyzico/buyer";

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
