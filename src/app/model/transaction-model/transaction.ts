// src/app/model/transaction/transaction.ts
export interface Transaction {
  id?: number;
  description: string;
  amount: number;
  disputed?: boolean;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
}
