import {OnInit, signal } from '@angular/core';
import { Transaction, TransactionService } from '../../../core/services/transaction.service';




export class TransactionList implements OnInit {

  transactions = signal<Transaction[]>([]);

  constructor(private txService: TransactionService) {}

  ngOnInit() :void {
    this.loadTransactions();
  }


   loadTransactions() {
    this.txService.getTransactions().subscribe({
      next: (data) => this.transactions.set(data),
      error: (err) => console.error(err)
    });
  }

  deleteTransaction(id: number) {
    this.txService.delete(id).subscribe({
      next: () => this.loadTransactions(),
      error: (err) => console.error(err)
    });
  }

}
