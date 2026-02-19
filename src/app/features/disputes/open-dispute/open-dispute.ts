import { Component, OnInit, signal } from '@angular/core';
import { TransactionService } from '../../../core/services/transaction.service';
import { DisputeService } from '../../../core/services/dispute.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DisputeRequest } from '../../../model/dispute/dispute';
import { Transaction } from '../../../model/transaction-model/transaction';

@Component({
  selector: 'app-open-dispute',       
  standalone: true,                   
  imports: [CommonModule, FormsModule],
  templateUrl: './open-dispute.html',
  styleUrls: ['./open-dispute.css'],
})
export class OpenDispute implements OnInit {

  transactions = signal<Transaction[]>([]);
  private _selectedTxId = signal<number>(0);
  private _reason = signal('');
  private _strategyType = signal('DEFAULT');

  constructor(private txService: TransactionService, private disputeService: DisputeService) {}

  // getter/setter for ngModel binding
  get selectedTxId() { return this._selectedTxId(); }
  set selectedTxId(value: number) { this._selectedTxId.set(value); }

  get reason() { return this._reason(); }
  set reason(value: string) { this._reason.set(value); }

  get strategyType() { return this._strategyType(); }
  set strategyType(value: string) { this._strategyType.set(value); }

  ngOnInit(): void {
      this.txService.getTransactions().subscribe(data =>{ 
        console.log('Transactions fetched:', data);
        this.transactions.set(data)
      });
  }

  openDispute(): void {
    const txId = this.selectedTxId;
    const reason = this.reason;

    if (!txId || !reason) {
      alert('Select a transaction and enter reason');
      return;
    }

    const transaction = this.transactions().find(t => t.id === txId);
    if (!transaction) {
      alert('Transaction not found');
      return;
    }

    const strategy = transaction.amount > 100 ? 'auto' : 'default';

    const request: DisputeRequest = {
      transactionId: txId,
      reason: reason,
      strategyType: strategy
    };

    this.disputeService.openDispute(request).subscribe({
      next: () => {
        alert(`Dispute opened using ${strategy} strategy`);
        this.selectedTxId = 0;
        this.reason = '';
      },
      error: err => console.error(err)
    });
  }
}
