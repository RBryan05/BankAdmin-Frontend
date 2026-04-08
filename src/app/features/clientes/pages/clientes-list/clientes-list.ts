import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-clientes-list',
  imports: [CommonModule],
  templateUrl: './clientes-list.html',
  styleUrl: './clientes-list.css',
})

export class ClientesList {
  clientes = [
    { codigo: 'C001', nombre: 'Alexis Rauda', dui: '0000000-0', telefono: '1234-5678', estado: 'Activo' },
    { codigo: 'C002', nombre: 'Marbelly Moreno', dui: '0000000-0', telefono: '1234-5678', estado: 'Activo' },
    { codigo: 'C001', nombre: 'Fernando Rauda', dui: '0000000-0', telefono: '1234-5678', estado: 'Inactivo' }
  ]
}
