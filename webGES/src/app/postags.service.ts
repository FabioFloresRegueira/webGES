import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
/***/
import { Tags } from './postags/tags';
@Injectable({
  providedIn: 'root'
})
export class PostagsService {

  //private apiURL = "http://localhost:3001/monitorar/api/tags";
  private apiURL = "https://fabio4678.c44.integrator.host/monitorar/api/tags";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/todos/')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAllativos(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/ativos/')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAllvigencia0a30(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/vigencia0a30/')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAllvigencia31a60(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/vigencia31a60/')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAllvigencia61a90(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/vigencia61a90/')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAllvigenciamaior90(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/vigenciamaior90/')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAllinativos(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/inativos/')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  // CRUD

  create(tags:Tags): Observable<any> {
    return this.httpClient.post(this.apiURL + '/', JSON.stringify(tags), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  find(iDTag:number): Observable<any> {
    return this.httpClient.get(this.apiURL + '/' + iDTag)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(iDTag:number, tags:Tags): Observable<any> {
    return this.httpClient.put(this.apiURL + '/' + iDTag, JSON.stringify(tags), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(iDTag:number){
    return this.httpClient.delete(this.apiURL + '/' + iDTag, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  deleteAll(tags:Tags): Observable<any> {
    return this.httpClient.delete(this.apiURL + '/', this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  // TRATAMENTO DE ERRRO
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage || 'Erro no Servidor.');
 }
}
