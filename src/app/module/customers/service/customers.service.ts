import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

constructor(private http: HttpClient) { }

  findCustomers(){
    return this.http.get(
      environment.api_url + '/api/customers/findCustomers',
    );
  }

   createCustomer(createCustomer: object) {
    return this.http.post(
      environment.api_url + '/api/customers/create',
      createCustomer
    );
  }

   findId(customersId: number) {
    return this.http.get(
      environment.api_url + '/api/customers/findByIdCustomers?id=' + customersId,
    );
  }

  editCustomer(editsCustomers: object) {
    return this.http.post(
      environment.api_url + '/api/customers/edit',
      editsCustomers
    );
  }

  deleteCustomer(customersId: number){
   return this.http.delete(
      environment.api_url + '/api/customers/delete?id=' + customersId,
    );
  }
}
