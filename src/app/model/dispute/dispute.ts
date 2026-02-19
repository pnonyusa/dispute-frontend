import { Transaction } from "../transaction-model/transaction";

export interface Dispute {
  id: number;
  transaction: Transaction ;
  reason: string;
  status?: string;

  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
}

export interface DisputeRequest {
  transactionId: number;
  reason: string;
  strategyType: string;
}