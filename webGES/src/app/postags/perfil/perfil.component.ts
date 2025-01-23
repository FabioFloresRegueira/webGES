import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GlobalprimengModule } from '../../globalprimeng/globalprimeng.module';
@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    GlobalprimengModule,

  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit{

  usuario = {
    nome: 'Fabio Flores Regueira',
    email: 'fabio.flores.regueira@gmail.com',
    cargo: 'Desenvolvedor Full Stack',
    foto: 'assets/images/profile-placeholder.jpg',
    telefone: '(21) 98854-2910',
    localizacao: 'Rio de Janeiro, RJ',
    sobre: 'Os desafios da vida colaboram para o nosso crescimento. Aprenda a tirar o maior de cada lição que a vida te reserva.'
  };

  constructor() { }

  ngOnInit(): void {
  }

  atualizarPerfil(): void {
    // Implementar lógica de atualização
    console.log('Perfil atualizado');
  }

}