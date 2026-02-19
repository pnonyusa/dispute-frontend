import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Needed for *ngIf
import { TransactionList } from '../transactions/transaction-list/transaction-list';
import { CreateTransaction } from '../transactions/create-transaction/create-transaction';
import { OpenDispute } from '../disputes/open-dispute/open-dispute';
import { DisputeHistory } from '../disputes/dispute-history/dispute-history';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,       // ✅ allows *ngIf
    TransactionList,
    CreateTransaction,
    OpenDispute,
    DisputeHistory
  ],
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.css']
})
export class HomeComponent {
  activeTab = 'transactions'; // default tab
}
