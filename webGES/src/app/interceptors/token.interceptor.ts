import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { UsuariosService } from '../usuarios.service';
import { StorageService } from './storageservice.ts.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private usuariosservice : UsuariosService, private storageservice: StorageService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this.storageservice.getToken();
        console.log('token: ' + token);

        /*
        const token = this.usuariosservice.obterTokenUsuario;
        console.log('token: ' + token);
        */

        if (token) {

          const requestUrl: Array<any> = request.url.split('/');
          const apiUrl: Array<any> = this.usuariosservice.apiUrlUsuario.split('/');

          if (requestUrl[2] === apiUrl[2]) {
              request = request.clone({
                  setHeaders: {
                      Authorization: `Bearer ${token}`,
                      token: `${token}`
                  }
              });
          }
      }

      return next.handle(request).pipe(
          catchError((error: HttpErrorResponse) => {
              if (error.status === 401) {
                  this.usuariosservice.deslogar();
              }
              return throwError(() => new Error(error.message)); // Corrigido aqui
          })
      );

    }
}

/*
import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
*/
