import { Injectable } from '@angular/core';
import { IContato } from '../interface/icontato';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError} from 'rxjs/operators';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ContratosService {

  url = "http://localhost:3000/contatos";

  constructor(private httpClient: HttpClient){ }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  public getContatos(): Observable<IContato[]>{
    return this.httpClient.get<IContato[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }  

  getContatoById(id: number): Observable<IContato>{
    return this.httpClient.get<IContato>(this.url + '/' + id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  postContato(contato: IContato): Observable<IContato>{
    return this.httpClient.post<IContato>(this.url, JSON.stringify(contato), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  deleteContato(contato: IContato){
    return this.httpClient.delete<IContato>(this.url + '/' + contato.id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  updateContat(contato: IContato): Observable<IContato>{
    return this.httpClient.put<IContato>(this.url + '/' + contato.id, JSON.stringify(contato), this.httpOptions )
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    }else{
      errorMessage = `Código do erro: ${error.status}, `+ `mensagem: ${error.message}`;
    }

    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
