export enum cashType {copper, denarii, silver, bitcoin, tickets, gold, unobtainium, beans,
diamonds, spacebucks, ether, soulgems, infinity, CASHTYPE_MAX};

export interface ICash {
    currency: cashType;
    quantity: number;
}