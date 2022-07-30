import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public _http: HttpClient) { }

  //Funcion Obtener productos
  obtenerCategoria(token) : Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/GetCategorias', { headers: headersToken });
  }

  //Function Agregar producto
  agregarCategoria(modeloProductos: Categoria) : Observable<any> {
    let parametros = JSON.stringify(modeloProductos) //Convertir el valor de javascript en json

    return this._http.post(this.url + '/AddCategoria', parametros, { headers: this.headersVariable });

  }


}
