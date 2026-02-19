
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SystemEnvironment } from '../constants/system-environment';
import { Transaction } from '../../model/transaction-model/transaction';


@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  
   private baseUrl = SystemEnvironment.BASE_URL;
  
    constructor(private http: HttpClient) {}
  
    getTransactions(): Observable<Transaction[]> {
      return this.http.get<Transaction[]>(`${this.baseUrl}${SystemEnvironment.ENDPOINTS.TRANSACTIONS}`);
    }

    create(tx: Transaction): Observable<Transaction> {
     return this.http.post<Transaction>(`${this.baseUrl}${SystemEnvironment.ENDPOINTS.TRANSACTIONS}`, tx);
    }
  
    getTransactionById(id: number): Observable<Transaction> {
      return this.http.get<Transaction>(`${this.baseUrl}${SystemEnvironment.ENDPOINTS.TRANSACTIONS}/${id}`);
    }

    delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${SystemEnvironment.ENDPOINTS.TRANSACTIONS}/${id}`);
  }
  
}
