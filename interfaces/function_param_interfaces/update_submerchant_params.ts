import { APIKey } from "../api_key";

export interface UpdateSubmerchantParams {
    conversationId: string,
    subMerchantKey: string,
    iban: string,
    address: string,
    contactName: string,
    contactSurname: string,
    email: string,
    gsmNumber: string,
    name: string,
    identityNumber: string,
    iyzicoAPIKeyInfo: APIKey
}
