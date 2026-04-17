import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../models/usuario.model';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioService } from '../../services/usuario';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './usuario-list.html',
  styleUrl: './usuario-list.css'
})
export class UsuarioListComponent implements OnInit {
  private usuarioService = inject(UsuarioService);

  usuarios: Usuario[] = [];
  displayedColumns: string[] = ['id', 'nombreUsuario', 'email', 'rol', 'fechaRegistro'];

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.getAll().subscribe({
      next: (data) => {
        this.usuarios = data;
        console.log(data)
      },
      error: (error) => {
        console.error('Error al cargar usuarios', error);
      }
    });
  }
}
