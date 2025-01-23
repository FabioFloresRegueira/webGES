import { Injectable } from '@angular/core';
import { map, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { HttpClient,  HttpParams,  HttpHeaders } from '@angular/common/http';
/***/
import { Tags } from './postags/tags';
@Injectable({
  providedIn: 'root'
})
export class PostagsService {

  private apiURL = "http://localhost:3001/monitorar/api/tags";
  //private apiURL = "https://fabio4678.c44.integrator.host/monitorar/api/tags";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }


  getAll(): Observable<any> {
      // Adicionando um timestamp para evitar problemas de cache, se necessário
      const params = new HttpParams().set('timestamp', Date.now().toString());
      return this.httpClient.get(this.apiURL + '/todos/', {params})
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllativos(): Observable<any> {
   // Adicionando um timestamp para evitar problemas de cache, se necessário
    const params = new HttpParams().set('timestamp', Date.now().toString());
    return this.httpClient.get(this.apiURL + '/ativos/', {params})
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAllvigencia0a30(): Observable<any> {
    // Adicionando um timestamp para evitar problemas de cache, se necessário
    const params = new HttpParams().set('timestamp', Date.now().toString());
    return this.httpClient.get(this.apiURL + '/vigencia0a30/', {params})
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAllvigencia31a60(): Observable<any> {
    // Adicionando um timestamp para evitar problemas de cache, se necessário
    const params = new HttpParams().set('timestamp', Date.now().toString());
    return this.httpClient.get(this.apiURL + '/vigencia31a60/', {params})
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAllvigencia61a90(): Observable<any> {
    const params = new HttpParams().set('timestamp', Date.now().toString());
    return this.httpClient.get(this.apiURL + '/vigencia61a90/', {params})
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAllvigenciamaior90(): Observable<any> {
    // Adicionando um timestamp para evitar problemas de cache, se necessário
    const params = new HttpParams().set('timestamp', Date.now().toString());
    return this.httpClient.get(this.apiURL + '/vigenciamaior90/', {params})
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAllinativos(): Observable<any> {
    // Adicionando um timestamp para evitar problemas de cache, se necessário
    const params = new HttpParams().set('timestamp', Date.now().toString());
    return this.httpClient.get(this.apiURL + '/inativos/', {params})
    .pipe(
      catchError(this.errorHandler)
    )
  }

  // CRUD

  create(tags:Tags): Observable<any> {
    // Adicionando um timestamp para evitar problemas de cache, se necessário
    const params = new HttpParams().set('timestamp', Date.now().toString());
    return this.httpClient.post(this.apiURL + '/', tags, {...this.httpOptions, params})
    .pipe(
      catchError(this.errorHandler)
    )
  }

  find(iDTag: number): Observable<any> {
    // Adicionando um timestamp para evitar problemas de cache, se necessário
    const params = new HttpParams().set('timestamp', Date.now().toString());

    return this.httpClient.get(`${this.apiURL}/${iDTag}`, { params })
      .pipe(
        catchError(this.errorHandler)
      );
  }

  update(iDTag: number, tags: Tags): Observable<any> {
    // Adicionando um timestamp para evitar problemas de cache, se necessário
    const params = new HttpParams().set('timestamp', Date.now().toString());

    return this.httpClient.put(`${this.apiURL}/${iDTag}`, tags, { ...this.httpOptions, params })
      .pipe(
        catchError(this.errorHandler)
      );
  }

  delete(iDTag: number): Observable<any> {
    // Adicionando um timestamp para evitar problemas de cache, se necessário
    const params = new HttpParams().set('timestamp', Date.now().toString());

    return this.httpClient.delete(`${this.apiURL}/${iDTag}`, { ...this.httpOptions, params })
      .pipe(
        catchError(this.errorHandler)
      );
  }

  deleteAll(tags: Tags): Observable<any> {
    // Adicionando um timestamp para evitar problemas de cache, se necessário
    const params = new HttpParams().set('timestamp', Date.now().toString());

    return this.httpClient.delete(this.apiURL + '/', { ...this.httpOptions, params, body: tags })
      .pipe(
        catchError(this.errorHandler)
      );
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
