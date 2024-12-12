import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuariosService } from '../usuarios.service';

@Injectable({
  providedIn: 'root'
})

export class UsuarioAutenticadoService implements CanActivate {

  constructor(private usuarioservice: UsuariosService, private router: Router) { }

  canActivate() {
    if (this.usuarioservice.logado){
      return true;
    }
    this.router.navigate(['postags/login']);
    return false;
  }
}
