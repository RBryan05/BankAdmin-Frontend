import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {

  clientes = [
    { codigo: '1', nombre: 'Alexis Rauda', dui: '00000000-0', telefono: '1234-5678', estado: 'Activo', correo: 'alexis.rauda@example.com', direccion: '123 Calle Principal, Ciudad' },
    { codigo: '2', nombre: 'Marbelly Moreno', dui: '00000000-0', telefono: '1234-5678', estado: 'Activo', correo: 'marbelly.moreno@example.com', direccion: '456 Avenida Secundaria, Ciudad' },
    { codigo: '3', nombre: 'Fernando Rauda', dui: '00000000-0', telefono: '1234-5678', estado: 'Inactivo', correo: 'fernando.rauda@example.com', direccion: '789 calle Tercera, Ciudad' }
  ];

  getClientes() {
    return this.clientes;
  }

  saveCliente(cliente: any) {
    // Lógica
    const nuevoCodigo = this.clientes.length > 0 ? Math.max(...this.clientes.map(c => parseInt(c.codigo))) + 1 : 1;
    cliente.codigo = nuevoCodigo.toString();
    this.clientes.push(cliente);
  }

  getClientePorCodigo(codigoCLiente: number) {
    return this.clientes.find(c => parseInt(c.codigo) === codigoCLiente);
  }

  updateCliente(codigoCLiente: number, cliente: any) {
    const index = this.clientes.findIndex(c => parseInt(c.codigo) === codigoCLiente);
    if (index >= 0) {
      cliente.codigo = codigoCLiente.toString();
      this.clientes[index] = cliente;
    }
  }
}
