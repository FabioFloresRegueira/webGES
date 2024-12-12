import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { UsuariosService } from '../usuarios.service';
@Injectable({
  providedIn: 'root'
})
export class UsuarioNaoAutenticadoService implements CanActivate {

  constructor(private usuariosservice: UsuariosService, private router: Router) { }

  canActivate(){
    if (this.usuariosservice.logado){
      this.router.navigate(['postags/login']); // [' ']
      return false;
    }
    return true;
  }

}

