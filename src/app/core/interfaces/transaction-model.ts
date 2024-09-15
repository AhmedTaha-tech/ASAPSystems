export interface TransactionModel {
    transactionId: string
    transactionType: string
    itemId: string,
    locationFrom: string
    locationTo?: string
    transactionDate: string
  }
  