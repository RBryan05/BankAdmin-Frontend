import { Component, inject } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientesService } from '../../services/clientes';
@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './cliente-form.html',
  styleUrls: ['./cliente-form.css'],
})
export class ClienteForm {

  private fb = inject(FormBuilder);
  private clienteService = inject(ClientesService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Formulario
  clienteForm!: FormGroup;

  // Para edición
  codigoCLiente: number | null = null;
  editando = false;

  // Inicializador de componentes
  ngOnInit(): void {
    this.buildfrom();
    this.cargarClienteSiEsEdicion();
  }

  // Metodo vacio para contrsiutir nuestro grupo del formulario
  buildfrom(): void {
    this.clienteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      dui: ['', [Validators.required, Validators.pattern(/^\d{8}-\d{1}$/)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{4}$/)]],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.maxLength(150)]],
      estado: ['Activo', [Validators.required]]
    })
  }

  // Metodo para guardar el cliente
  guardar(): void {
    // Validar el formulario
    if (this.clienteForm.invalid) {
      this.clienteForm.markAllAsTouched();
      return;
    }

    // Crear nuevo objeto
    const cliente = this.clienteForm.value;

    if (this.editando && this.codigoCLiente !== null) {
      this.clienteService.updateCliente(this.codigoCLiente, cliente);
    } else {
      // Guardar el cliente usando el servicio
      this.clienteService.saveCliente(cliente);
    }
    // Redirigir a la lista de clientes
    this.router.navigate(['/clientes']);
  }

  // Edición de cliente

  // Función que valide si es una edición
  cargarClienteSiEsEdicion(): void {
    const codigoParametro = this.route.snapshot.paramMap.get('codigo');
    
    if (!codigoParametro) return;

    this.codigoCLiente = Number(codigoParametro);
    this.editando = true;

    const cliente = this.clienteService.getClientePorCodigo(this.codigoCLiente);

    if (!cliente) {
      this.router.navigate(['/clientes']);
      return;
    }

    // Cargar datos en el formulario
    this.clienteForm.patchValue({
      nombre: cliente.nombre,
      dui: cliente.dui,
      telefono: cliente.telefono,
      correo: cliente.correo,
      direccion: cliente.direccion,
      estado: cliente.estado
    });
  }

  // Getters  para validaciones
  get nombre() {
    return this.clienteForm.get('nombre');
  }

  get dui() {
    return this.clienteForm.get('dui');
  }

  get telefono() {
    return this.clienteForm.get('telefono');
  }

  get correo() {
    return this.clienteForm.get('correo');
  }

  get direccion() {
    return this.clienteForm.get('direccion');
  }

  get estado() {
    return this.clienteForm.get('estado');
  }
}