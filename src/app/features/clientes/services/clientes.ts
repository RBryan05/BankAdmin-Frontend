import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {

  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private apiUrl = `${environment.apiUrl}/clientes`;

  private getHeaders() {
    const token = this.authService.obtenerToken();
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getClientes() {
    return this.http.get<any[]>(this.apiUrl, this.getHeaders());
  }

  saveCliente(cliente: any) {
    return this.http.post<any>(this.apiUrl, cliente, this.getHeaders());
  }

  getClientePorCodigo(codigoCLiente: number) {
    return this.http.get<any>(`${this.apiUrl}/${codigoCLiente}`, this.getHeaders());
  }

  updateCliente(codigoCLiente: number, cliente: any) {
    return this.http.put<any>(`${this.apiUrl}/${codigoCLiente}`, cliente, this.getHeaders());
  }
}
