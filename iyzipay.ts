import Iyzipay from "iyzipay";
import { IyziPay3D } from "./interfaces/iyzipay_3d_req";
import { IyziPayForm } from "./interfaces/iyzipay_form_req";
import { Pay3DParams } from "./interfaces/iyzico/function_param_interfaces/3d_iyzipay_params";
import { SubMerchant } from "./interfaces/submerchant";
import { PayFormParams } from "./interfaces/iyzico/function_param_interfaces/form_iyzipay_params";
import { APIKey } from "./interfaces/iyzico/api_key";
import { UpdateSubmerchantParams } from "./interfaces/iyzico/function_param_interfaces/update_submerchant_params";

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

  let asyncIyziPayForm = function (req: IyziPayForm) {
    return new Promise((resolve, reject) => {
      iyzipay.checkoutFormInitialize.create(req, function (err, result) {
        if (err) reject(err);
        else resolve(result);
      });
    });
  };

  let request: IyziPayForm = {
    locale: Iyzipay.LOCALE.TR,
    conversationId: conversationId,
    price: price.toString(),
    paidPrice: pricePaid.toString(),
    currency: Iyzipay.CURRENCY.TRY,
    enabledInstallments: enabledInstallments,
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    callbackUrl: url,
    buyer: buyer,
    shippingAddress: shippingAddress,
    billingAddress: billingAddress,
    basketItems: basketItems,
  };
  let res = await asyncIyziPayForm(request);
  return res;
};

export const iyzipayRetrieveForm = async (token: string, iyzicoAPIKeyInfo: APIKey) => {
  let iyzipay = new Iyzipay(iyzicoAPIKeyInfo);

  let asyncIyziPayForm = function (req) {
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
  let res = await asyncIyziPayForm(request);
  return res;
};


///Check https://dev.iyzipay.com/tr/api/3d-ile-odeme for more info.
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

  let asyncIyziPay3D = function (req: IyziPay3D) {
    return new Promise((resolve, reject) => {
      iyzipay.threedsInitialize.create(req, function (err, result) {
        if (err) reject(err);
        else resolve(result);
      });
    });
  };

  let request: IyziPay3D = {
    locale: Iyzipay.LOCALE.TR,
    conversationId: conversationId,
    price: price.toString(),
    paidPrice: pricePaid.toString(),
    currency: Iyzipay.CURRENCY.TRY,
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    paymentCard: paymentCard,
    callbackUrl: url,
    buyer: buyer,
    shippingAddress: shippingAddress,
    billingAddress: billingAddress,
    basketItems: basketItems,
  };
  let res = await asyncIyziPay3D(request);
  return res;
};

export const confirmIyziPay = async (
  paymentId: string,
  conversationId: string,
  iyzicoAPIKeyInfo: APIKey
) => {
  let iyzipay = new Iyzipay(iyzicoAPIKeyInfo);

  let asyncConfirmIyziPay = function (
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
  let res = await asyncConfirmIyziPay(paymentId, conversationId);
  return res;
};

export const confirmSubMerchantIyziPayForm = async (
  paymentTransactionId: string,
  iyzicoAPIKeyInfo: APIKey
) => {
  let iyzipay = new Iyzipay(iyzicoAPIKeyInfo);

  let asyncConfirmIyziPaySubMerchant = function (
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
  let res = await asyncConfirmIyziPaySubMerchant(
    paymentTransactionId,
  );
  return res;
};


export const confirmSubMerchantIyziPay = async (
  paymentTransactionId: string,
  conversationId: string,
  iyzicoAPIKeyInfo: APIKey
  ) => {
  let iyzipay = new Iyzipay(iyzicoAPIKeyInfo);

  let asyncConfirmIyziPaySubMerchant = function (
    paymentTransactionId: string,
    conversationId: string
  ) {
    return new Promise((resolve, reject) => {
      iyzipay.approval.create(
        {
          locale: Iyzipay.LOCALE.TR,
          paymentTransactionId: paymentTransactionId,
          conversationId: conversationId,
        },
        function (err, result) {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  };
  let res = await asyncConfirmIyziPaySubMerchant(
    paymentTransactionId,
    conversationId
  );
  return res;
};

export const updateSubmerchantIyziPay = async ({
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
