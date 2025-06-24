import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { chlorine_records, QualityIncident, QualityIncidentCreateRequest, QualityIncidentUpdateRequest, QualityTest, QualityTestUpdateRequest, testing_points, UpdateChlorine_records } from '../models/water-quality.model';
import { map, Observable } from 'rxjs';
import { OrganizationService } from './organization.service';
import { Organization } from '../models/organization.model';
interface ApiResponse<T> {
  status: boolean;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class WaterQualityService {

  private apiUrl = 'http://localhost:8080/api/v2/chlorinerecords'
  private api = 'http://localhost:8080/api/v2/qualitytests'
  private apiIncident = 'http://localhost:8080/api/v2/qualityincidents'
  private apiTestingPoints = 'http://localhost:8080/api/v2/testingpoints'

  constructor(private http:HttpClient, private organizationService:OrganizationService) 
  { }

  // Listado de las organizaciones 

  getPointstById(id: string): Observable<testing_points> {
      return this.http.get<ApiResponse<testing_points>>(`${this.apiTestingPoints}/${id}`).pipe(
        map(response => response.data)
      );
    }

  getAllTestingPoints(): Observable<testing_points[]> {
    return this.http.get<ApiResponse<testing_points[]>>(this.apiTestingPoints).pipe(
      map(response => response.data)
    );
  }

  getAllChlorine(){
    return this.http.get<ApiResponse<chlorine_records[]>>(this.apiUrl).pipe(
          map(response => response.data)
        );
  }

    getChlorineById(id: string): Observable<chlorine_records> {
      return this.http.get<ApiResponse<chlorine_records>>(`${this.apiUrl}/${id}`).pipe(
        map(response => response.data)
      );
    }

     createChlorine(chlorine: chlorine_records): Observable<chlorine_records> {
        return this.http.post<ApiResponse<chlorine_records>>(this.apiUrl, chlorine).pipe(
          map(response => response.data)
        );
      }
    
          
      updateChlorine(id: string, chlorine: UpdateChlorine_records): Observable<chlorine_records> {
        // Primero obtenemos el registro actual
        return new Observable<chlorine_records>(observer => {
          this.getChlorineById(id).subscribe({
            next: (currentChlorine) => {
              // Combinamos el registro actual con los campos modificados
              const updatedChlorine = {
                ...currentChlorine,
                ...chlorine
              };
              
              // Enviamos la actualización
              this.http.put<chlorine_records>(`${this.apiUrl}/${id}`, updatedChlorine)
                .subscribe({
                  next: (response) => observer.next(response),
                  error: (error) => observer.error(error),
                  complete: () => observer.complete()
                });
            },
            error: (error) => observer.error(error)
          });
        });
      }

      deleteChlorine(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
      }
      // QualityTest

      getAllTest(){
        return this.http.get<ApiResponse<QualityTest[]>>(this.api).pipe(
              map(response => response.data)
            );
      }

      getTestById(id: string) {
        return this.http.get<ApiResponse<QualityTest>>(`${this.api}/${id}`).pipe(
          map(response => response.data)
        );
      }
      
      createTest(test: QualityTest): Observable<QualityTest> {
        return this.http.post<ApiResponse<QualityTest>>(this.api, test).pipe(
          map(response => response.data)
        );
      }
      
      updateTest(id: string, test: QualityTestUpdateRequest): Observable<QualityTest> {
        // Primero obtenemos el registro actual
        return new Observable<QualityTest>(observer => {
          this.getTestById(id).subscribe({
            next: (currentTest) => {
              // Combinamos el registro actual con los campos modificados
              const updateTest = {
                ...currentTest,
                ...test
              };
              
              // Enviamos la actualización
              this.http.put<ApiResponse<QualityTest>>(`${this.api}/${id}`, updateTest)
                .subscribe({
                  next: (response) => observer.next(response.data),
                  error: (error) => observer.error(error),
                  complete: () => observer.complete()
                });
            },
            error: (error) => observer.error(error)
          });
        });
      }

      // QualityIncident

      getAllIncident(){
        return this.http.get<ApiResponse<QualityIncident[]>>(this.apiIncident).pipe(
          map(response => response.data)
        );
      }
      
      getIncidentById(id: string){
        return this.http.get<ApiResponse<QualityIncident>>(`${this.apiIncident}/${id}`).pipe(
          map(response => response.data)
        );
      }
      
      createIncident(incident: QualityIncidentCreateRequest): Observable<QualityIncident> {
        return this.http.post<ApiResponse<QualityIncident>>(this.apiIncident, incident).pipe(
          map(response => response.data)
        );
      }
      
      updateIncident(id: string, incident: QualityIncidentUpdateRequest): Observable<QualityIncident> {
        return new Observable<QualityIncident>(observer => {
          this.getIncidentById(id).subscribe({
            next: (currentIncident) => {
              const updatedIncident = {
                ...currentIncident,
                ...incident
              };
              this.http.put<ApiResponse<QualityIncident>>(`${this.apiIncident}/${id}`, updatedIncident)
                .subscribe({
                  next: (response) => observer.next(response.data),
                  error: (error) => observer.error(error),
                  complete: () => observer.complete()
                });
            },
            error: (error) => observer.error(error)
          });
        });
      }

        }
