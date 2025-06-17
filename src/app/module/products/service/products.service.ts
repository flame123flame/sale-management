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

  createProducts(createProducts: object){
    return this.http.post(
      environment.api_url + '/api/products/create',
      createProducts
    );
  }
}
