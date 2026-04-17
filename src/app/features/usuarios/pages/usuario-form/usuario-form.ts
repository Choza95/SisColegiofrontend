import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { UsuarioService } from '../../services/usuario';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './usuario-form.html',
  styleUrl: './usuario-form.css'
})
export class UsuarioFormComponent {
  private fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  mensajeExito = '';
  mensajeError = '';

  form = this.fb.group({
    nombreUsuario: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email]],
    clave: ['', [Validators.required, Validators.minLength(6)]],
    rol: ['', [Validators.required]]
  });

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = {
      nombreUsuario: this.form.value.nombreUsuario!,
      email: this.form.value.email!,
      clave: this.form.value.clave!,
      rol: this.form.value.rol!
    };

    this.usuarioService.create(data).subscribe({
      next: () => {
        this.mensajeError = '';
        this.mensajeExito = 'Usuario registrado correctamente';
        this.form.reset();
      },
      error: (error) => {
        this.mensajeExito = '';
        this.mensajeError = error?.error?.mensaje || 'No se pudo registrar el usuario';
      }
    });
  }

  irALista(): void {
    this.router.navigate(['/usuarios']);
  }
}
