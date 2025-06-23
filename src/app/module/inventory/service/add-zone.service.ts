import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddZoneService {

constructor(private http: HttpClient) { }

  createZone(createZone: object) {
    return this.http.post(
      environment.api_url + '/api/zone/create',
      createZone
    );
  }

  editZone(editZone: object) {
    return this.http.post(
      environment.api_url + '/api/zone/edit',
      editZone
    );
  }
  
}
