export enum TransactionType {
    refill,
    withdrawal
}

export class BalanceTransactionItem {
    id: string;
    balanceId : string;
    amount: number;
    description : string;
    transactionType : TransactionType
}