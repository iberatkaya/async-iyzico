import { BasketItem } from "./iyzico/basket_item";
import { BillingAddress } from "./iyzico/billing_address";
import { ShippingAddress } from "./iyzico/shipping_address";
import { CreditCard } from "./iyzico/credit_card";
import { Buyer } from "./iyzico/buyer";

export interface IyziPayForm {
  conversationId: string;
  locale: any;
  price: string;
  paidPrice: string;
  currency: any;
  enabledInstallments: number[];
  paymentGroup: string;
  buyer: Buyer;
  callbackUrl: string;
  shippingAddress: ShippingAddress;
  billingAddress: BillingAddress;
  basketItems: BasketItem[];
}
