import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { ItemModel } from '../../interfaces/item-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent implements OnInit  {
constructor( private itemService: ItemService
  , private fb: FormBuilder) { }

itemForm: FormGroup;
public gridData:ItemModel[]|any=[];
  ngOnInit(): void {
    this.gridData=this.GetItemsList();

    this.itemForm = this.fb.group({
      itemId: ['', Validators.required],
      itemName: ['', Validators.required],
      quantity: ['', Validators.required],
      location: ['', Validators.required]
    });
  }
GetItemsList(){
  return this.itemService.GetItemsList();
}

 // #region Add Edit
 isModalOpen = false;
 selectedItem?: any;

 openModal(item?: any): void {
   console.log("Edt item", item)
   this.selectedItem = item;
   if (item) {
     const selectedItem = this.gridData.find(item => item.itemId === item.itemId);
     console.log("selectedItem", selectedItem)
     this.itemForm.patchValue({
       itemId: item.itemId || null,
       itemName: item.itemName,
       quantity: item.quantity,
       location: item.location
     });
   }
   else {
      this.itemForm.reset();
   }
   this.isModalOpen = true;
 }

 closeModal(): void {
   this.isModalOpen = false;
   this.selectedItem = null;
 }


 onSave(): void {
  this.itemForm.markAllAsTouched();
   if (this.itemForm.valid) {
     const itemData = this.itemForm.value;
     if (this.selectedItem && this.selectedItem.itemId) {
       this.updateItem(this.selectedItem.itemId, itemData);
     } else {
       this.addItem(itemData);
     }
     this.closeModal();
   } else {
     console.log("Form is invalid");
   }
 }

 addItem(itemData: any): void {
   debugger;
   const newItem = {
     itemId: itemData.itemId.itemId, itemName: itemData.itemName, quantity: itemData.quantity
     , location: itemData.location
   };
   this.gridData = [...this.gridData, newItem];
 }

 updateItem(itemId: number, itemData: any): void {
   const gridIndex = this.gridData.findIndex(t => t.itemId === itemId);
   if (gridIndex !== -1) {
     this.gridData[gridIndex] = { itemId, ...itemData };

     debugger;
     console.log('Updated item in itemsGridData', this.gridData[gridIndex]);
   }
   else {
     console.log('Item not found in itemsGridData');
   }
 }
 //#endregion


// #region Delete
deleteItem(item: any) {
  if (confirm(`Are you sure you want to delete ${item.itemName}?`)) {
    this.gridData = this.gridData.filter(i => i.itemId !== item.itemId);
  }
}

public confirmDelete = false;
public itemToDelete: any;

public openDeleteConfirmation(dataItem: any): void {
  this.confirmDelete = true;
  this.itemToDelete = dataItem;
}

public onDelete(): void {
  this.gridData = this.gridData.filter(item => item !== this.itemToDelete);
  this.closeDialog();
}

public closeDialog(): void {
  this.confirmDelete = false;
}
// #endregion
}
