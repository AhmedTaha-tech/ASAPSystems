import { Injectable } from '@angular/core';
import { ItemModel } from '../interfaces/item-model';
import { Observable } from 'rxjs';
import { TransactionModel } from '../interfaces/transaction-model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  transactions:TransactionModel[]=[
    {
    "transactionId": "T001",
    "transactionType": "move",
    "itemId": "A005",
    "locationFrom": "Warehouse 1",
    "locationTo": "Warehouse 2",
    "transactionDate": "2024-09-12"
    },
    {
    "transactionId": "T002",
    "transactionType": "adjust",
    "itemId": "B010",
    "locationFrom": "Warehouse 3",
    "transactionDate": "2024-09-11"
    }
    ]
   
    GetTransactionsList() {
      return this.transactions;
    }
}

