import { BasketItem } from "../basket_item";
import { BillingAddress } from "../billing_address";
import { ShippingAddress } from "../shipping_address";
import { CreditCard } from "../credit_card";
import { Buyer } from "../buyer";
import { APIKey } from "../api_key";

export interface Pay3DParams {
  price: string;
  pricePaid: string;
  paymentCard: CreditCard;
  buyer: Buyer;
  url: string;
  conversationId: string;
  shippingAddress: ShippingAddress;
  billingAddress: BillingAddress;
  basketItems: BasketItem[];
  iyzicoAPIKeyInfo: APIKey;
}
