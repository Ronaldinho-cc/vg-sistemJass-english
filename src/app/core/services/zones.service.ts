import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { Status, zones, zonesCreate, zonesUpdate } from '../models/organization.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

interface ApiResponse<T>{
  status:boolean,
  data:T
}
@Injectable({
  providedIn: 'root'
})
export class ZonesService {
  private apiUrl = 'https://super-guide-v6vgg59rq7jj2pgr7-8080.app.github.dev/api/v1/zones'
  constructor(private http:HttpClient) { }
  

  getAllZones(): Observable<zones[]> {
    return this.http.get<ApiResponse<zones[]>>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }


  getZonesById(id: string): Observable<zones> {
    return this.http.get<ApiResponse<zones>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }
  createZones(zone: zonesCreate): Observable<zones> {
    return this.http.post<ApiResponse<zones>>(this.apiUrl, zone).pipe(
      map(response => response.data)
    );
  }

   updateZones(id: string, zones: zonesUpdate): Observable<zones> {
     return this.http.put<ApiResponse<zones>>(`${this.apiUrl}/${id}`, zones).pipe(
       map(response => response.data)
     );
   }

  deleteZones(id: string): Observable<void> {
    return this.http.patch<ApiResponse<void>>(`${this.apiUrl}/${id}/desactivate`,{}).pipe(
      map(response => response.data)
    );
  }

  restoreZones(id: string): Observable<zones> {
    return this.http.patch<ApiResponse<zones>>(`${this.apiUrl}/${id}/activate`, {}).pipe(
      map(response => response.data)
    );
  }
}
