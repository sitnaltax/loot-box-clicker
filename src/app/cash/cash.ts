export enum cashType {copper, denarii, silver};

export interface ICash {
    currency: cashType;
    quantity: number;
}