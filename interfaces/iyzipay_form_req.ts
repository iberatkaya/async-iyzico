import { BasketItem } from "./basket_item";
import { BillingAddress } from "./billing_address";
import { Buyer } from "./buyer";
import { ShippingAddress } from "./shipping_address";

export interface IyzipayForm {
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
