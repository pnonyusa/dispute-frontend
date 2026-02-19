import { Component, OnInit, signal } from '@angular/core';
import { TransactionService } from '../../../core/services/transaction.service';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../../model/transaction-model/transaction';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-list.html',
  styleUrls: ['./transaction-list.css'],
})

export class TransactionList implements OnInit {
  transactions = signal<Transaction[]>([]);

  constructor(private txService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    this.txService.getTransactions().subscribe({
      next: (data) => this.transactions.set(data),
      error: (err) => console.error(err),
    });
  }

  deleteTransaction(id: number) {
    if (!confirm('Delete this transaction?')) return;
    this.txService.delete(id).subscribe({
      next: () => this.loadTransactions(),
      error: (err) => console.error(err),
    });
  }
}
