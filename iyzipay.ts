import Iyzipay from "iyzipay";
import { Iyzipay3D } from "./interfaces/iyzipay_3d_req";
import { IyzipayForm } from "./interfaces/iyzipay_form_req";
import { Pay3DParams } from "./interfaces/function_param_interfaces/3d_iyzipay_params";
import { SubMerchant } from "./interfaces/submerchant";
import { PayFormParams } from "./interfaces/function_param_interfaces/form_iyzipay_params";
import { APIKey } from "./interfaces/api_key";
import { UpdateSubmerchantParams } from "./interfaces/function_param_interfaces/update_submerchant_params";

/** 
 * Make a purchase with a Checkout Form.
 * For more information: https://dev.iyzipay.com/en/checkout-form
 */
export const iyzipayPaymentForm = async ({
  basketItems,
  billingAddress,
  buyer,
  price,
  pricePaid,
  conversationId,
  enabledInstallments,
  shippingAddress,
  url,
  iyzicoAPIKeyInfo,
}: PayFormParams) => {
  let iyzipay = new Iyzipay(iyzicoAPIKeyInfo);

  let asyncIyzipayForm = function (req: IyzipayForm) {
    return new Promise((resolve, reject) => {
      iyzipay.checkoutFormInitialize.create(req, function (err, result) {
        if (err) reject(err);
        else resolve(result);
      });
    });
  };

  let request: IyzipayForm = {
    locale: Iyzipay.LOCALE.TR,
    conversationId: conversationId,
    price: price,
    paidPrice: pricePaid,
    currency: Iyzipay.CURRENCY.TRY,
    enabledInstallments: enabledInstallments,
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    callbackUrl: url,
    buyer: buyer,
    shippingAddress: shippingAddress,
    billingAddress: billingAddress,
    basketItems: basketItems,
  };
  let res = await asyncIyzipayForm(request);
  return res;
};


/** 
 * Retrieve a purchase from a Checkout Form.
 * For more information: https://dev.iyzipay.com/en/checkout-form/retrieve
 */
export const retrieveIyzipayForm = async (token: string, iyzicoAPIKeyInfo: APIKey) => {
  let iyzipay = new Iyzipay(iyzicoAPIKeyInfo);

  let asyncIyzipayForm = function (req) {
    return new Promise((resolve, reject) => {
      iyzipay.checkoutForm.retrieve(req, function (err, result) {
        if (err) reject(err);
        else resolve(result);
      });
    });
  };

  let request = {
    locale: Iyzipay.LOCALE.TR,
    token: token,
  };
  let res = await asyncIyzipayForm(request);
  return res;
};


/** 
 * Make a purchase with 3D Auth API.
 * For more information: https://dev.iyzipay.com/en/api/auth-with-3d
 */
export const iyzipayPayment3D = async ({
  basketItems,
  billingAddress,
  buyer,
  paymentCard,
  price,
  pricePaid,
  conversationId,
  shippingAddress,
  url,
  iyzicoAPIKeyInfo,
}: Pay3DParams) => {
  let iyzipay = new Iyzipay(iyzicoAPIKeyInfo);

  let asyncIyzipay3D = function (req: Iyzipay3D) {
    return new Promise((resolve, reject) => {
      iyzipay.threedsInitialize.create(req, function (err, result) {
        if (err) reject(err);
        else resolve(result);
      });
    });
  };

  let request: Iyzipay3D = {
    locale: Iyzipay.LOCALE.TR,
    conversationId: conversationId,
    price: price,
    paidPrice: pricePaid,
    currency: Iyzipay.CURRENCY.TRY,
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    paymentCard: paymentCard,
    callbackUrl: url,
    buyer: buyer,
    shippingAddress: shippingAddress,
    billingAddress: billingAddress,
    basketItems: basketItems,
  };
  let res = await asyncIyzipay3D(request);
  return res;
};


/** 
 * Confirm the purchase made with 3D Auth API.
 * For more information: https://dev.iyzipay.com/tr/api/3d-ile-odeme
 */
export const confirmIyzipayPayment3D = async (
  paymentId: string,
  conversationId: string,
  iyzicoAPIKeyInfo: APIKey
) => {
  let iyzipay = new Iyzipay(iyzicoAPIKeyInfo);

  let asyncConfirmIyzipay = function (
    paymentId: string,
    conversationId: string
  ) {
    return new Promise((resolve, reject) => {
      iyzipay.threedsPayment.create(
        {
          locale: Iyzipay.LOCALE.TR,
          paymentId: paymentId,
          conversationId: conversationId,
        },
        function (err, result) {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  };
  let res = await asyncConfirmIyzipay(paymentId, conversationId);
  return res;
};


/** 
 * Create a Submerchant for your marketplace.
 * For more information: https://dev.iyzipay.com/en/marketplace/submerchant
 */
export const createSubmerchant = async (sub: SubMerchant, iyzicoAPIKeyInfo: APIKey) => {
  try {
    let iyzipay = new Iyzipay(iyzicoAPIKeyInfo);
    let asyncIyzipaySubmerchantCreate = function (sub: SubMerchant) {
      return new Promise((resolve, reject) => {
        iyzipay.subMerchant.create(sub, function (err, result) {
          if (err) reject(err);
          else resolve(result);
        });
      });
    };
    let res = await asyncIyzipaySubmerchantCreate(sub);
    return res;
  } catch (e) {
    console.log(e);
  }
};

/** 
 * Confirm the payment made to your Submerchant in your marketplace.
 * For more information: https://dev.iyzipay.com/en/marketplace/approval
 */
export const confirmSubmerchantIyzipay = async (
  paymentTransactionId: string,
  iyzicoAPIKeyInfo: APIKey
) => {
  let iyzipay = new Iyzipay(iyzicoAPIKeyInfo);

  let asyncConfirmIyzipaySubmerchant = function (
    paymentTransactionId: string
  ) {
    return new Promise((resolve, reject) => {
      iyzipay.approval.create(
        {
          locale: Iyzipay.LOCALE.TR,
          paymentTransactionId: paymentTransactionId,
        },
        function (err, result) {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  };
  let res = await asyncConfirmIyzipaySubmerchant(
    paymentTransactionId,
  );
  return res;
};


/** 
 * Update the information for your Submerchant in your marketplace.
 * For more information: https://dev.iyzipay.com/en/marketplace/submerchant
 */
export const updateSubmerchantIyzipay = async ({
  conversationId,
  subMerchantKey,
  iban,
  address,
  contactName,
  contactSurname,
  email,
  gsmNumber,
  name,
  identityNumber,
  iyzicoAPIKeyInfo
}: UpdateSubmerchantParams) => {
  let iyzipay = new Iyzipay(iyzicoAPIKeyInfo);

  let asyncUpdateIyzipaySubmerchant = function (
    conversationId: string,
    subMerchantKey: string,
    iban: string,
    address: string,
    contactName: string,
    contactSurname: string,
    email: string,
    gsmNumber: string,
    name: string,
    identityNumber: string
  ) {
    return new Promise((resolve, reject) => {
      iyzipay.subMerchant.update(
        {
          locale: Iyzipay.LOCALE.TR,
          conversationId,
          subMerchantKey,
          iban,
          address,
          contactName,
          contactSurname,
          email,
          gsmNumber,
          name,
          identityNumber,
          currency: Iyzipay.CURRENCY.TRY,
        },
        function (err, result) {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  };
  let res = await asyncUpdateIyzipaySubmerchant(
    conversationId,
    subMerchantKey,
    iban,
    address,
    contactName,
    contactSurname,
    email,
    gsmNumber,
    name,
    identityNumber
  );
  return res;
};


