
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SystemEnvironment } from '../constants/system-environment';

export interface TransactionService {
  id: number;
  description: string;
  amount: number;
  disputed: boolean;

  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  
   private baseUrl = SystemEnvironment.BASE_URL;
  
    constructor(private http: HttpClient) {}
  
    getTransactions(): Observable<TransactionService[]> {
      return this.http.get<TransactionService[]>(`${this.baseUrl}${SystemEnvironment.ENDPOINTS.TRANSACTIONS}`);
    }

    create(tx: TransactionService): Observable<TransactionService> {
     return this.http.post<TransactionService>(`${this.baseUrl}${SystemEnvironment.ENDPOINTS.TRANSACTIONS}`, tx);
    }
  
    getTransactionById(id: number): Observable<TransactionService> {
      return this.http.get<TransactionService>(`${this.baseUrl}${SystemEnvironment.ENDPOINTS.TRANSACTIONS}/${id}`);
    }

    delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${SystemEnvironment.ENDPOINTS.TRANSACTIONS}/${id}`);
  }
  
}
