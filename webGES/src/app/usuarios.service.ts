import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuarios } from './postags/usuarios';
import { StorageService } from './interceptors/storageservice.ts.service';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  //public apiUrlUsuario = "http://localhost:3001/monitorar/api/tags";
  private apiURL = "https://fabio4678.c44.integrator.host/monitorar/api/usuarios";

  constructor(private httpClient: HttpClient,
    private router: Router, private storageservice: StorageService) { }


    logar(usuario: Usuarios): Observable<any> {

      /*return this.httpClient.post<any>(apiUrlUsuario + "/login", usuario).pipe(
      tap((resposta) => {
        if(!resposta.sucesso) return;
        localStorage.setItem('token', btoa(JSON.stringify(resposta['token'])));
        localStorage.setItem('usuario', btoa(JSON.stringify(resposta['usuario'])));
        this.router.navigate(['']);
      }));*/

      console.log(usuario.email + ' - '+ usuario.senha);

      return this.mockUsuarioLogin(usuario).pipe(tap((resposta) => {
        if (!resposta.sucesso) return;
        this.storageservice.setToken(btoa(JSON.stringify("TokenQueSeriaGeradoPelaAPI")));
        localStorage.setItem('usuario', btoa(JSON.stringify(usuario)));
        this.router.navigate(['postags/index']);
      }));

      /*
      return this.mockUsuarioLogin(usuario).pipe(tap((resposta) => {
        if(!resposta.sucesso) return;
        localStorage.setItem('token', btoa(JSON.stringify("TokenQueSeriaGeradoPelaAPI")));
        localStorage.setItem('usuario', btoa(JSON.stringify(usuario)));
        this.router.navigate(['postags/index']);
      }));
      */

    }

    private mockUsuarioLogin(usuario: Usuarios): Observable<any>{
      var retornoMock: any = {}; //[]

      if(usuario.email === "fabio.flores.regueira@gmail.com" && usuario.senha == "123"){
        retornoMock.sucesso = true;
        retornoMock.usuario = usuario;
        retornoMock.token = "TokenQueSeriaGeradoPelaAPI";
        return of(retornoMock);
      }
      retornoMock.sucesso = false;
      retornoMock.usuario = usuario;
      return of(retornoMock);
    }

    deslogar() {
      this.storageservice.clear();
      //localStorage.clear();
      this.router.navigate(['postags/login']);
    }

    get obterUsuarioLogado(): Usuarios | null {

      const usuario = localStorage.getItem('usuarios');
      console.log(usuario);
      return usuario ? JSON.parse(atob(usuario)) : null;

      /*
      return localStorage.getItem('Usuarios')
        ? JSON.parse(atob(localStorage.getItem('Usuarios')))
        : null;
      */

    }

    get obterIdUsuarioLogado(): number | null {

      const usuario = localStorage.getItem('usuario');
      return usuario ? (JSON.parse(atob(usuario)) as Usuarios).iDUser : null;

      /*
      return localStorage.getItem('usuario')
        ? (JSON.parse(atob(localStorage.getItem('usuario'))) as Usuarios).iDUser
        : null;
      */

    }

    get obterTokenUsuario(): string | null {
      const token = this.storageservice.getToken();
      //const token = localStorage.getItem('token');
      console.log('token');
      return token ? JSON.parse(atob(token)) : null;

      /*
      return localStorage.getItem('token')
        ? JSON.parse(atob(localStorage.getItem('token')))
        : null;
      */
    }

    get logado(): boolean {
      console.log(this.storageservice.getToken());
      return this.storageservice.getToken() ? true : false;
      /*
      console.log(localStorage.getItem('token'));
      return localStorage.getItem('token') ? true : false;
      */
    }




}
