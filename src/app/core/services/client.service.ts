// src/app/core/services/client.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client, ClientCreate, ClientUpdate } from '../models/client.model';

interface ApiResponse<T> {
  status: boolean;
  data: T;
}

@Injectable({
  providedIn: 'root'
})

export class ClientService {
  private apiUrl = 'https://coherent-jodie-vallegrandev2-6b6f847c.koyeb.app/api/v1/users';

  constructor(private http: HttpClient) { }

  getAllClients(): Observable<Client[]> {
    return this.http.get<ApiResponse<Client[]>>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  getClientById(id: string): Observable<Client> {
    return this.http.get<ApiResponse<Client>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  createClient(client: ClientCreate): Observable<Client> {
    return this.http.post<ApiResponse<Client>>(this.apiUrl, client).pipe(
      map(response => response.data)
    );
  }

  updateClient(id: string, client: ClientUpdate): Observable<Client> {
    return this.http.put<ApiResponse<Client>>(`${this.apiUrl}/${id}`, client).pipe(
      map(response => response.data)
    );
  }

  deleteClient(id: string): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  restoreClient(id: string): Observable<Client> {
    return this.http.put<ApiResponse<Client>>(`${this.apiUrl}/${id}/restore`, {}).pipe(
      map(response => response.data)
    );
  }
}
