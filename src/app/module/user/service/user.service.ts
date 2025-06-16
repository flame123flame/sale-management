import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  findUser() {
    return this.http.get(
      environment.api_url + '/api/users/findUser',
    );
  }

  createUser(createUser: object) {
    return this.http.post(
      environment.api_url + '/api/users/create',
      createUser
    );
  }

  findId(userId: number) {
    return this.http.get(
      environment.api_url + '/api/users/findById?id=' + userId,
    );
  }


  editUser(editsUser: object) {
    return this.http.post(
      environment.api_url + '/api/users/edit',
      editsUser
    );
  }

  deleteUser(userId: number) {
    return this.http.delete(
      environment.api_url + '/api/users/delete?id=' + userId,
    );
  }
}
