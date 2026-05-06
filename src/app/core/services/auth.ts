import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
// Importar el archivo environment
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // importar el modulo httpclient
  private http = inject(HttpClient);

  login(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, data);
  }

  guardarToken(token: string) {
    sessionStorage.setItem('bankadmin_token', token);
  }

  obtenerToken(): string | null {
    return sessionStorage.getItem('bankadmin_token');
  }

  estaAutenticado(): boolean {
    return !!this.obtenerToken();
  }

  logout() {
    sessionStorage.removeItem('bankadmin_token');
  }
}
