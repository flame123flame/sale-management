import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

constructor(private http: HttpClient) { }

  findProducts(){
    return this.http.get(
      environment.api_url + '/api/products/findProducts'
    );
  }

  findByIdPro(productsId: number) {
    return this.http.get(
      environment.api_url + '/api/products/findByIdProducts?id=' + productsId,
    );
  }
  
  createProducts(createProducts: object){
    return this.http.post(
      environment.api_url + '/api/products/create',
      createProducts
    );
  }

  deleteProducts(productsId: number) {
    return this.http.delete(
      environment.api_url + '/api/products/delete?id=' + productsId,
    );
  }

  getCategories() {
    return this.http.get(
      environment.api_url + '/api/categories/findCategories'
    );
  }

   editProducts(editsProducts: object) {
    return this.http.post(
      environment.api_url + '/api/products/edit', 
      editsProducts
    );
  }
}
