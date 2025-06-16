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
}
