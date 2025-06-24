import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserCreateRequest, UserUpdateRequest, ResponseDto, RolesUsers, StatusUsers } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'https://coherent-jodie-vallegrandev2-6b6f847c.koyeb.app/api/v1/users';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<ResponseDto<User[]>> {
    return this.http.get<ResponseDto<User[]>>(this.apiUrl);
  }

  getUserById(id: string): Observable<ResponseDto<User>> {
    return this.http.get<ResponseDto<User>>(`${this.apiUrl}/${id}`);
  }

  // Obtener usuarios por rol
  getUsersByRole(role: RolesUsers): Observable<ResponseDto<User[]>> {
    return this.http.get<ResponseDto<User[]>>(`${this.apiUrl}/role/${role}`);
  }

  // Obtener usuarios por estado
  getUsersByStatus(status: StatusUsers): Observable<ResponseDto<User[]>> {
    return this.http.get<ResponseDto<User[]>>(`${this.apiUrl}/status/${status}`);
  }

  // Crear nuevo usuario
  createUser(user: UserCreateRequest): Observable<ResponseDto<User>> {
    return this.http.post<ResponseDto<User>>(this.apiUrl, user, this.httpOptions);
  }

  // Actualizar usuario completo
  updateUser(id: string, user: UserUpdateRequest): Observable<ResponseDto<User>> {
    return this.http.put<ResponseDto<User>>(`${this.apiUrl}/${id}`, user, this.httpOptions);
  }

  // Actualización parcial de usuario
  partialUpdateUser(id: string, user: Partial<UserUpdateRequest>): Observable<ResponseDto<User>> {
    return this.http.patch<ResponseDto<User>>(`${this.apiUrl}/${id}`, user, this.httpOptions);
  }

  // Eliminar usuario (soft delete)
  deleteUser(id: string): Observable<ResponseDto<User>> {
    return this.http.delete<ResponseDto<User>>(`${this.apiUrl}/${id}`);
  }

  // Restaurar usuario
  restoreUser(id: string): Observable<ResponseDto<User>> {
    return this.http.put<ResponseDto<User>>(`${this.apiUrl}/${id}/restore`, {}, this.httpOptions);
  }
}
