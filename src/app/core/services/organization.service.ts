import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, catchError, tap } from 'rxjs';
import { Organization, OrganizationCreate, OrganizationUpdate, Status } from '../models/organization.model';

interface ApiResponse<T>{
  status:boolean,
  data:T
}

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private apiUrl = 'https://super-guide-v6vgg59rq7jj2pgr7-8080.app.github.dev/api/organizations'
  
  constructor(private http:HttpClient) { }

  getAllOrganization(): Observable<Organization[]> {
    console.log('Llamando a la API:', this.apiUrl);
    return this.http.get<Organization[] | ApiResponse<Organization[]>>(this.apiUrl).pipe(
      tap(response => {
        console.log('Respuesta completa de la API:', response);
      }),
      map(response => {
        // Si la respuesta es un array directo
        if (Array.isArray(response)) {
          return response;
        }
        // Si la respuesta tiene el formato ApiResponse
        if (response && 'data' in response) {
          return response.data;
        }
        console.error('Formato de respuesta no reconocido:', response);
        return [];
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la llamada a la API:', error);
        console.error('URL:', this.apiUrl);
        console.error('Status:', error.status);
        console.error('Mensaje:', error.message);
        throw error;
      })
    );
  }

  getOrganizationById(id: string): Observable<Organization> {
    console.log('Obteniendo organización con ID:', id);
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      tap(response => {
        console.log('Respuesta completa de getOrganizationById:', response);
      }),
      map(response => {
        // Si la respuesta es directamente un objeto Organization
        if (response && typeof response === 'object' && 'id' in response) {
          console.log('Respuesta directa de organización:', response);
          return {
            organization_id: response.organization_id,
            name: response.name,
            legalRepresentative: response.legalRepresentative,
            address: response.address,
            phone: response.phone,
            status: response.status ? Status.ACTIVE : Status.INACTIVE
          } as Organization;
        }
        
        // Si la respuesta tiene el formato ApiResponse
        if (response && 'data' in response) {
          console.log('Respuesta con formato ApiResponse:', response);
          return response.data;
        }

        console.error('Formato de respuesta no reconocido:', response);
        throw new Error('Formato de respuesta no válido');
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error HTTP al obtener la organización:', error);
        if (error.status === 404) {
          throw new Error('Organización no encontrada');
        }
        throw error;
      })
    );
  }

  createOrganization(organization: OrganizationCreate): Observable<Organization> {
    return this.http.post<ApiResponse<Organization>>(this.apiUrl, organization).pipe(
      map(response => response.data)
    );
  }

  updateOrganization(id: string, client: OrganizationUpdate): Observable<Organization> {
    return this.http.put<ApiResponse<Organization>>(`${this.apiUrl}/${id}`, client).pipe(
      map(response => response.data)
    );
  }

  deleteOrganization(id: string): Observable<void> {
    return this.http.patch<ApiResponse<void>>(`${this.apiUrl}/${id}/desactivate`,{}).pipe(
      map(response => response.data)
    );
  }

  restoreOrganization(id: string): Observable<void> {
    return this.http.patch<ApiResponse<void>>(`${this.apiUrl}/${id}/activate`, {}).pipe(
      map(response => response.data)
    );
  }
}
