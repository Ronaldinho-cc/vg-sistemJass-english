import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { branch, BranchCreate, BranchUpdate, Status } from '../models/branch.model';

interface ApiResponse<T>{
  status:boolean,
  data:T
}

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private apiUrl = 'https://super-guide-v6vgg59rq7jj2pgr7-8080.app.github.dev/api/v1/branches'

  constructor(private http:HttpClient) { }

  getAllBranches(): Observable<branch[]> {
    console.log('Llamando a la API:', this.apiUrl);
    return this.http.get<branch[] | ApiResponse<branch[]>>(this.apiUrl).pipe(
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
        throw error;
      })
    );
  }
 getBranchById(id: string): Observable<branch> {
    console.log('Obteniendo organización con ID:', id);
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      tap(response => {
        console.log('Respuesta completa de getBranchById:', response);
      }),
      map(response => {
        // Si la respuesta es directamente un objeto Branch
        if (response && typeof response === 'object' && 'id' in response) {
          console.log('Respuesta directa de organización:', response);
          return {
            branchId: response.id,
            name: response.name,
            address: response.address,
            phone: response.phone,
            email:response.email,
            status: response.status ? Status.ACTIVE : Status.INACTIVE
          } as branch;
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

  createBranch(branch: BranchCreate): Observable<branch> {
    return this.http.post<ApiResponse<branch>>(this.apiUrl, branch).pipe(
      map(response => response.data)
    );
  }

  updateBranch(id: string, Branch: BranchUpdate): Observable<branch> {
    const BranchToUpdate = {
      ...Branch,
      status: true // Esto se convertirá en ACTIVE en el backend
    };
    console.log('Enviando datos de actualización:', { id, BranchToUpdate });
    
    return this.http.put<any>(`${this.apiUrl}/${id}`, BranchToUpdate).pipe(
      tap(response => {
        console.log('Respuesta de actualización:', response);
      }),
      map(response => {
        // Si la respuesta es directamente un objeto Branch
        if (response && typeof response === 'object' && 'id' in response) {
          console.log('Respuesta directa de organización:', response);
          return {
            branchId: response.id,
            name: response.name,
            address: response.address,
            phone: response.phone,
            email:response.email,
            status: Status.ACTIVE
          } as branch;
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
        console.error('Error al actualizar la organización:', error);
        throw error;
      })
    );
  }

  deleteBranch(id: string): Observable<void> {
    return this.http.patch<ApiResponse<void>>(`${this.apiUrl}/${id}/desactivate`,{}).pipe(
      map(response => response.data)
    );
  }

  restoreBranch(id: string): Observable<void> {
    return this.http.patch<ApiResponse<void>>(`${this.apiUrl}/${id}/activate`, {}).pipe(
      map(response => response.data)
    );
  }

}
