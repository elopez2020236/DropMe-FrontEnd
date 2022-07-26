import { Component, OnInit } from '@angular/core';
import { Productos } from 'src/app/models/productos.model';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
  providers: [ProductosService, UsuarioService]
})

export class ProductosComponent implements OnInit {

  public productosModelGet: Productos;
  public productosModelPost: Productos;
  public productosModelGetId: Productos;
  public token;

  constructor(
    private _productosService: ProductosService,
    private _usuarioService: UsuarioService

  ) {
      this.productosModelPost = new Productos('','','','',[],{},{});
      this.productosModelGetId = new Productos('','','','',[],{},{});
      this.token = this._usuarioService.getToken();
   }

  ngOnInit(): void {
    console.log('DropMe');
    this.getProductos();
  }

  //Funcion Obtener Productos
  getProductos() {
    this._productosService.obtenerProductos(this.token).subscribe(
      (response) => {
        console.log(response.productos);
        this.productosModelGet = response.mensaje;
      },
      (error) => {
        console.log(<any>error);
      }
    )
  }

  // Funcion para editar productos
  getProductosId(idProducto){
    this._productosService.obtenerProductoId(idProducto).subscribe (
      (response) => {
        console.log(response);
        this.productosModelGetId = response.mensaje;
      },
      (error) => {

      }
    )
  }


  //Funcion Editar Producto
  putProducto() {
    this._productosService.editarProducto(this.productosModelGetId).subscribe (
      (response) => {
        console.log(response);
        this.getProductos();
      },
      (error) => {

      }
    )
  }


   //Funcion Agregar Producto
   postProductos(){
    this._productosService.agregarProductos(this.productosModelPost).subscribe (           //Nos Suscribimos
      (response) => {
        console.log(response)
        this.getProductos();

        this.productosModelPost.nombre = '';
        this.productosModelPost.categoria = '';
        this.productosModelPost.precio = '';
        this.productosModelPost.fotos = [];
        this.productosModelPost.idFactura = {};
        this.productosModelPost.idUsuario = {};

        //Alert
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Producto Agregado Correctamente',
          showConfirmButton: false,
          timer: 1500
        })

      },
      (error) => {
        console.log(<any>error);

        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error.mensaje,
          showConfirmButton: false,
          timer: 1500
        })

      }
    )
  }


  //Funtion eliminar producto
  deleteProducto(id) {
    this._productosService.eliminarProducto(id).subscribe (
      response => {
        console.log(response);
        this.getProductos(); //Refrescar la página
      }
    ),
    error => {
      console.log(<any>error);
    }
  }


}