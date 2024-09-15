import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { ItemModel } from '../../interfaces/item-model';
import { TransactionModel } from '../../interfaces/transaction-model';
import { TransactionService } from '../../services/transaction.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent implements OnInit {
  transaction: any;
  constructor(private transactionService: TransactionService
    , private itemService: ItemService
    , private fb: FormBuilder
    , private datePipe: DatePipe) { }

  transactionForm: FormGroup;
  searchForm: FormGroup;
  public gridData: TransactionModel[] | any = [];
  public itemData: ItemModel[] | any = [];
  transactionsWithItemNames: ItemModel[] = [];
  public filteredData: TransactionModel[] | any = [];

  ngOnInit(): void {
    this.gridData = this.GetTransactionsList();
    this.filteredData = this.gridData
    this.itemData = this.GetItemsList();
    this.getTransactionsWithItemNames();
    this.filteredData = this.transactionsWithItemNames;

    this.transactionForm = this.fb.group({
      itemId: ['', Validators.required],
      transactionType: ['', Validators.required],
      locationFrom: ['', Validators.required],
      locationTo: ['', Validators.required],
      transactionDate: ['', Validators.required],
    });

    // Initialize search  form group
    this.searchForm = this.fb.group({
      itemId: [null],
      transactionType: [null],
      transactionDateFrom: [null],
      transactionDateTo: [null]
    });

    if (this.transaction) {
      this.transactionForm.patchValue(this.transaction);
    }
  }

  getItemNameById(itemId: string): string {
    const item = this.itemData.find(item => item.itemId === itemId);
    console.log(item);
    console.log(item ? item.itemName : "Unknown Item");
    return item ? item.itemName : "Unknown Item";
  }

  getTransactionsWithItemNames() {
    this.transactionsWithItemNames = this.filteredData.map(transaction => {
      return {
        ...transaction,
        itemName: this.getItemNameById(transaction.itemId),
      };
    });
  }

  GetTransactionsList() {
    return this.transactionService.GetTransactionsList();
  }
  GetItemsList() {
    return this.itemService.GetItemsList();
  }

// #region Search Region
// public searchText: string = '';
// public selectedDate: Date | null = null;

// public onSearch(): void {
//   this.filterData();
// }

// public onDateChange(value: Date): void {
//   this.filterData();
// }

// private filterData(): void {
//   this.filteredData = this.gridData;
//   this.filteredData = this.searchText != null && this.searchText != "" ? this.filteredData.filter((item: TransactionModel) => item.itemId.toLowerCase().includes(this.searchText.toLowerCase())) : this.filteredData;
//   this.filteredData = this.selectedDate != null ? this.filteredData.filter((item: TransactionModel) => new Date(item.transactionDate).toDateString() == this.selectedDate?.toDateString()) : this.filteredData;
//   this.getTransactionsWithItemNames();
//   this.filteredData = this.transactionsWithItemNames;
// }
// #endregion

  // #region Add Edit
  transactionTypes = ['move', 'adjust', 'dispose'];
  isModalOpen = false;
  selectedTransaction?: any;

  openModal(transaction?: any): void {
    console.log("Edt transaction", transaction)
    this.selectedTransaction = transaction;
    if (transaction) {
      const selectedItem = this.itemData.find(item => item.itemId === transaction.itemId);
      console.log("selectedItem", selectedItem)
      this.transactionForm.patchValue({
        itemId: selectedItem || null,
        transactionType: transaction.transactionType,
        locationFrom: transaction.locationFrom,
        locationTo: transaction.locationTo,
        transactionDate: transaction.transactionDate ? new Date(transaction.transactionDate) : null
      });
    }
    else {
      this.transactionForm.reset();
    }
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedTransaction = null;
  }


  onSave(): void {
    this.transactionForm.markAllAsTouched();
    if (this.transactionForm.valid) {
      const transactionData = this.transactionForm.value;
      if (this.selectedTransaction && this.selectedTransaction.transactionId) {
        this.updateTransaction(this.selectedTransaction.transactionId, transactionData);
      } else {
        this.addTransaction(transactionData);
      }
      this.closeModal();
    } else {
      console.log("Form is invalid");
    }
  }

  addTransaction(transactionData: any): void {
    debugger;
    const newItem = {
      transactionId: `T00' ${this.gridData.length + 1}`, itemId: transactionData.itemId.itemId, transactionType: transactionData.transactionType, locationFrom: transactionData.locationFrom
      , locationTo: transactionData.locationTo, transactionDate: this.datePipe.transform(transactionData.transactionDate, 'yyyy-MM-dd')
    };
    this.gridData = [...this.gridData, newItem];
    this.filteredData = [...this.filteredData, newItem];
    this.getTransactionsWithItemNames();
    this.filteredData = this.transactionsWithItemNames;
  }

  updateTransaction(transactionId: number, transactionData: any): void {
    const gridIndex = this.gridData.findIndex(t => t.transactionId === transactionId);
    if (gridIndex !== -1) {
      this.gridData[gridIndex] = { transactionId, ...transactionData };
      this.gridData[gridIndex].transactionId = transactionId
      this.gridData[gridIndex].transactionType = transactionData.transactionType
      this.gridData[gridIndex].itemId = transactionData.itemId.itemId
      this.gridData[gridIndex].transactionDate = this.datePipe.transform(transactionData.transactionDate, 'yyyy-MM-dd')

      this.filteredData[gridIndex] = { transactionId, ...transactionData };
      this.filteredData[gridIndex].transactionId = transactionId
      this.filteredData[gridIndex].transactionType = transactionData.transactionType
      this.filteredData[gridIndex].itemId = transactionData.itemId.itemId
      this.filteredData[gridIndex].transactionDate = this.datePipe.transform(transactionData.transactionDate, 'yyyy-MM-dd')
      this.getTransactionsWithItemNames();
      this.filteredData = this.transactionsWithItemNames;

      debugger;
      console.log('Updated transaction in transactionsGridData', this.gridData[gridIndex]);
    }
    else {
      console.log('Transaction not found in transactionsGridData');
    }
  }
  //#endregion

  // #region Delete
  deleteItem(item: any) {
    if (confirm(`Are you sure you want to delete ${item.name}?`)) {
      this.gridData = this.gridData.filter(i => i.id !== item.id);
    }
  }

  public confirmDelete = false;
  public itemToDelete: any;

  public openDeleteConfirmation(dataItem: any): void {
    this.confirmDelete = true;
    this.itemToDelete = dataItem;
  }

  public onDelete(): void {
    this.filteredData = this.filteredData.filter(item => item !== this.itemToDelete);
    this.closeDialog();
  }

  public closeDialog(): void {
    this.confirmDelete = false;
  }
  // #endregion

  // #region Filter region
  onSearchForm(): void {
    debugger;
    if (this.searchForm.valid) {
      const searchCriteria = this.searchForm.value;
      console.log('Search criteria:', searchCriteria);

      this.filteredData = this.gridData;
      if (searchCriteria.itemId !== null)
        this.filteredData = this.filteredData.filter((item: TransactionModel) => item.itemId.toLowerCase().includes(searchCriteria.itemId.itemId.toLowerCase()));
      if (searchCriteria.transactionType != null && searchCriteria.transactionType != "All Transaction Types")
        this.filteredData = this.filteredData.filter((item: TransactionModel) => item.transactionType.toLowerCase().includes(searchCriteria.transactionType));
      if (searchCriteria.transactionDateFrom)
        this.filteredData = this.filteredData.filter((item: TransactionModel) => new Date(item.transactionDate) >= searchCriteria.transactionDateFrom);
      if (searchCriteria.transactionDateTo)
        this.filteredData = this.filteredData.filter((item: TransactionModel) => new Date(item.transactionDate) <= searchCriteria.transactionDateTo);
      this.getTransactionsWithItemNames();
      this.filteredData = this.transactionsWithItemNames;
    }
  }

  onReset(): void {
    this.filteredData = this.gridData;
    this.getTransactionsWithItemNames();
    this.filteredData = this.transactionsWithItemNames;
    this.searchForm.reset({
      keyword: '',
      itemId: null,
      transactionType: null,
      locationFrom: null,
      transactionDate: null
    });
  }
  // #ndregion
}
