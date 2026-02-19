import { Component, OnInit, signal } from '@angular/core';
import { DisputeService } from '../../../core/services/dispute.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Dispute } from '../../../model/dispute/dispute';

@Component({
  selector: 'app-dispute-history',
  standalone: true,               // ✅ Must be standalone
  imports: [CommonModule, FormsModule], // ✅ OK
  templateUrl: './dispute-history.html',
  styleUrls: ['./dispute-history.css']
})
export class DisputeHistory implements OnInit {
  disputes = signal<Dispute[]>([]);

  constructor(private disputeService: DisputeService) {}

  ngOnInit(): void {
    this.loadDisputes();
  }

  loadDisputes() {
    this.disputeService.getDisputes().subscribe({
      next: data => this.disputes.set(data),
      error: err => console.error(err)
    });
  }

  deleteDispute(id?: number) {
    if (!id) return;   // guard against undefined
    if (!confirm('Delete this dispute?')) return;

    this.disputeService.delete(id).subscribe({
      next: () => this.loadDisputes(),
      error: err => console.error(err)
    });
  }
}
