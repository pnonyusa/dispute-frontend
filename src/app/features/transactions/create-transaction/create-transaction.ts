import { Component, signal } from '@angular/core';
import {TransactionService } from '../../../core/services/transaction.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Transaction } from '../../../model/transaction-model/transaction';


@Component({
  selector: 'app-create-transaction',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl:'./create-transaction.html',
  styleUrls: ['./create-transaction.css'],
})
export class CreateTransaction {
  private _description = signal('');
  private _amount = signal<number>(0);

  // Getters and setters for ngModel
  get description() { return this._description(); }
  set description(value: string) { this._description.set(value); }

  get amount() { return this._amount(); }
  set amount(value: number) { this._amount.set(value); }

  constructor(private txService: TransactionService) {}

  createTransaction() {
    if (this.description && this.amount !== 0) {
      const tx: Transaction = {
        description: this.description,
        amount: this.amount
      };
      this.txService.create(tx).subscribe({
        next: () => {
          alert('Transaction created!');
          this._description.set('');
          this._amount.set(0);
        },
        error: (err) => console.error(err)
      });
    } else {
      alert('Please fill all fields');
    }
  }
}
