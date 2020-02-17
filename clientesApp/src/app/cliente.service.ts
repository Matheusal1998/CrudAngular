import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { Cliente } from './cliente';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  url = 'http://localhost:16434/api/clientes';
  
  constructor(private http: HttpClient) { }

  getAllCliente(): Observable<Cliente[]> {  
    return this.http.get<Cliente[]>(this.url + '/todos');  
  }  

  getClienteById(clienteid: string): Observable<Cliente> {  
    const apiurl = `${this.url}/${clienteid}`;
    return this.http.get<Cliente>(apiurl);  
  }  

  createCliente(cliente: Cliente): Observable<Cliente> {  
    return this.http.post<Cliente>(this.url + '/incluir', cliente, httpOptions);  
  }  

  updateCliente(clienteid: string, cliente: Cliente): Observable<Cliente> {  
    const apiurl = this.url+ '/alterar?id=' + clienteid ;
    return this.http.put<Cliente>(apiurl,cliente, httpOptions);  
  }  

  deleteClienteById(clienteid: string): Observable<number> {  
    return this.http.delete<number>(this.url + '/excluir?id=' + clienteid,httpOptions);  
  }  

}
