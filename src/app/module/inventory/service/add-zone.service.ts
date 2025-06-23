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

  findZone(){
    return this.http.get(
      environment.api_url + '/api/zone/findZone'
    );
  }

  findId(zoneId: number){
    return this.http.get(
        environment.api_url + '/api/zone/findById?id=' + zoneId,
    );
  }

  deleteZone(zoneId: number) {
    return this.http.delete(
      environment.api_url + '/api/zone/delete?id=' + zoneId
    );
  }
}
