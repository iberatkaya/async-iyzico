import { Iyzipay3D } from "./interfaces/iyzipay_3d_req";
import { IyzipayForm } from "./interfaces/iyzipay_form_req";
import { Pay3DParams } from "./interfaces/function_param_interfaces/3d_iyzipay_params";
import { Submerchant } from "./interfaces/submerchant";
import { PayFormParams } from "./interfaces/function_param_interfaces/form_iyzipay_params";
import { APIKey } from "./interfaces/api_key";
import { UpdateSubmerchantParams } from "./interfaces/function_param_interfaces/update_submerchant_params";
const Iyzipay = require("iyzipay");

/**
 * AsyncIyzico is a wrapper around Iyzico that adds TypeScript types
 * and uses Promises instead of callbacks.
 * 
 * @param {APIKey} iyzicoAPIKeyInfo The iyzico API key.
 * @example let asyncIyizco = new AsyncIyzico(iyzicoAPIKeyInfo);
 * let res = await asyncIyizco.iyzipayPaymentForm(params);
 * if(res.status === "success") return res;
 * else throw "Error";
 */

export class AsyncIyzico {
  _iyzipay: typeof Iyzipay;

  constructor(iyzicoAPIKeyInfo: APIKey){
    this._iyzipay = new Iyzipay(iyzicoAPIKeyInfo);
  }
  
/** 
 * Make a purchase with a Checkout Form.
 * 
 * @param {PayFormParams} payFormParams The object that contains the parameters such
 * as the buyer, price and billing address that required for the Checkout Form.
 * 
 * @returns
 * Checkout https://dev.iyzipay.com/en/checkout-form for its return value.
 */
  async iyzipayPaymentForm (payFormParams: PayFormParams): Promise<Object> {

    let asyncIyzipayForm = function (req: any, _iyzipay: typeof Iyzipay) {
      return new Promise((resolve, reject) => {
        _iyzipay.checkoutFormInitialize.create(req, function (err: any, result: any) {
          if (err) reject(err);
          else resolve(result);
        });
      });
    };

    let {
      basketItems,
      billingAddress,
      buyer,
      price,
      pricePaid,
      conversationId,
      enabledInstallments,
      shippingAddress,
      url,
    } = payFormParams;

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
    let res = await asyncIyzipayForm(request, this._iyzipay) as Object;
    return res;
  };


  /** 
   * Retrieve a purchase from a Checkout Form.
   * 
   * @param {string} token The token of the Checkout Form.
   * 
   * @returns 
   * Checkout https://dev.iyzipay.com/en/checkout-form for its return value.
   */
  async retrieveIyzipayForm (token: string): Promise<Object> {
    

    let asyncIyzipayForm = function (req: any, _iyzipay: typeof Iyzipay) {
      return new Promise((resolve, reject) => {
        _iyzipay.checkoutForm.retrieve(req, function (err: any, result: any) {
          if (err) reject(err);
          else resolve(result);
        });
      });
    };

    let request = {
      locale: Iyzipay.LOCALE.TR,
      token: token,
    };
    let res = await asyncIyzipayForm(request, this._iyzipay) as Object;
    return res;
  };


  /** 
   * Make a purchase with 3D Auth API.
   * 
   * @param {Pay3DParams} pay3DParamsThe object that contains the parameters such
   * as the buyer, price and billing address that required for the 3D Auth API.
   * 
   * @returns Checkout https://dev.iyzipay.com/en/api/auth-with-3d for its return value.
   */
  async iyzipayPayment3D (pay3DParams: Pay3DParams): Promise<Object> {
    

    let asyncIyzipay3D = function (req: any, _iyzipay: typeof Iyzipay) {
      return new Promise((resolve, reject) => {
        _iyzipay.threedsInitialize.create(req, function (err: any, result: any) {
          if (err) reject(err);
          else resolve(result);
        });
      });
    };

    let {
      basketItems,
      billingAddress,
      buyer,
      paymentCard,
      price,
      pricePaid,
      conversationId,
      shippingAddress,
      url,
    } = pay3DParams;

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
    let res = await asyncIyzipay3D(request, this._iyzipay) as Object;
    return res;
  };


  /** 
   * Confirm the purchase made with 3D Auth API.
   * 
   * @param {string} paymentId The paymentId required to confirm the 3D Auth API payment.
   * @param {string} conversationId An optional conversationId
   * 
   * @returns Checkout https://dev.iyzipay.com/tr/api/3d-ile-odeme for its return value.
   */
  async confirmIyzipayPayment3D (
    paymentId: string,
    conversationId?: string,
  ): Promise<Object> {

    let asyncConfirmIyzipay = function (
      paymentId: string,
      _iyzipay: typeof Iyzipay,
      conversationId?: string
    ) {
      return new Promise((resolve, reject) => {
        _iyzipay.threedsPayment.create(
          (conversationId !== undefined) ?
            {
              locale: Iyzipay.LOCALE.TR,
              paymentId: paymentId,
              conversationId: conversationId,
            }
          :
            {
              locale: Iyzipay.LOCALE.TR,
              paymentId: paymentId,
            },
          function (err: any, result: any) {
            if (err) reject(err);
            else resolve(result);
          }
        );
      });
    };
    let res = await asyncConfirmIyzipay(paymentId, this._iyzipay, conversationId) as Object;
    return res;
  };


  /** 
   * Create a Submerchant for your marketplace.
   * 
   * @param {SubMerchant} submerchant The submerchant object that will be created in the marketplace.
   * 
   * @returns Checkout https://dev.iyzipay.com/en/marketplace/submerchant for its return value.
   */
  async createSubmerchant (submerchant: Submerchant): Promise<Object>  {
    let asyncIyzipaySubmerchantCreate = function (submerchant: Submerchant, _iyzipay: typeof Iyzipay) {
      return new Promise((resolve, reject) => {
        _iyzipay.subMerchant.create(submerchant, function (err: any, result: any) {
          if (err) reject(err);
          else resolve(result);
        });
      });
    };
    let res = await asyncIyzipaySubmerchantCreate(submerchant, this._iyzipay) as Object;
    return res;
  };

  /** 
   * Confirm the payment made to your Submerchant in your marketplace.
   * 
   * @param {string} paymentTransactionId The payment transaction id that will be confirmed for the submerchant.
   * 
   * @returns Checkout https://dev.iyzipay.com/tr/pazaryeri/onay-verme for its return value.
   */
  async confirmSubmerchantIyzipay (
    paymentTransactionId: string,
  ): Promise<Object> {
    

    let asyncConfirmIyzipaySubmerchant = function (
      paymentTransactionId: string, _iyzipay: typeof Iyzipay
    ) {
      return new Promise((resolve, reject) => {
        _iyzipay.approval.create(
          {
            locale: Iyzipay.LOCALE.TR,
            paymentTransactionId: paymentTransactionId,
          },
          function (err: any, result: any) {
            if (err) reject(err);
            else resolve(result);
          }
        );
      });
    };
    let res = await asyncConfirmIyzipaySubmerchant(
      paymentTransactionId, this._iyzipay
    ) as Object;
    return res;
  };


  /** 
   * Update the information for your Submerchant in your marketplace.
   * 
   * @param {UpdateSubmerchantParams} updateSubmerchantParams The object that contains the parameters such as 
   * the merchants TC, address, and IBAN required for updating the Submerchant's informtation.
   * 
   * @returns Checkout https://dev.iyzipay.com/en/marketplace/submerchant for its return value.
   */
  async updateSubmerchantIyzipay (updateSubmerchantParams: UpdateSubmerchantParams): Promise<Object> {
    

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
      identityNumber: string, _iyzipay: typeof Iyzipay
    ) {
      return new Promise((resolve, reject) => {
        _iyzipay.subMerchant.update(
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
          function (err: any, result: any) {
            if (err) reject(err);
            else resolve(result);
          }
        );
      });
    };

    let {
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
    } = updateSubmerchantParams;
  
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
      identityNumber,
      this._iyzipay
    ) as Object;
    return res;
  };
}
