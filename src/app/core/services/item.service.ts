import { Injectable } from '@angular/core';
import { ItemModel } from '../interfaces/item-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  items:ItemModel[]=[
    {
    "itemId": "A005",
    "itemName": "Item A",
    "quantity": 100,
    "location": "Warehouse 1"
    },
    {
    "itemId": "B010",
    "itemName": "Item B",
    "quantity": 50,
    "location": "Warehouse 3"
    }
    ]
    GetItemsList() {
      return this.items;
    }
}
