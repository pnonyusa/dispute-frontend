import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SystemEnvironment } from '../constants/system-environment';
import {Dispute, DisputeRequest } from '../../model/dispute/dispute';
import { Transaction } from '../../model/transaction-model/transaction';



@Injectable({
  providedIn: 'root',
})
export class DisputeService {

    private baseUrl = SystemEnvironment.BASE_URL;

    constructor(private http: HttpClient) {}
  
    openDispute(request: DisputeRequest): Observable<Dispute> {
      return this.http.post<Dispute>(`${this.baseUrl}${SystemEnvironment.ENDPOINTS.DISPUTES}`, request);
    }
  
    getDisputes(): Observable<Dispute[]> {
      return this.http.get<Dispute[]>(`${this.baseUrl}${SystemEnvironment.ENDPOINTS.DISPUTES}`);
    }
  
    getDisputeByTransaction(transactionId: number): Observable<Dispute> {
      return this.http.get<Dispute>(
        `${this.baseUrl}${SystemEnvironment.ENDPOINTS.DISPUTES}/${transactionId}`
      );
    }

    delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${SystemEnvironment.ENDPOINTS.DISPUTES}/${id}`);
  }
}
