import { BasketItem } from "../basket_item";
import { BillingAddress } from "../billing_address";
import { ShippingAddress } from "../shipping_address";
import { Buyer } from "../buyer";
import { APIKey } from "../api_key";

export interface PayFormParams {
  price: string;
  pricePaid: string;
  enabledInstallments: number[];
  buyer: Buyer;
  url: string;
  conversationId: string;
  shippingAddress: ShippingAddress;
  billingAddress: BillingAddress;
  basketItems: BasketItem[];
}
