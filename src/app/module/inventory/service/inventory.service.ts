import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class InventoryService {

    constructor(private http: HttpClient) { }

    //   createZone(createZone: object) {
    //     return this.http.post(
    //       environment.api_url + '/api/zone/create',
    //       createZone
    //     );
    //   }

    createInv(createInv: object) {
        return this.http.post(
            environment.api_url + '/api/inventory/create',
            createInv
        );
    }
    deleteInv(invId: number) {
        return this.http.delete(
            environment.api_url + '/api/inventory/delete?id=' + invId
        );
    }

    editInv(editInv: object) {
        return this.http.post(
            environment.api_url + '/api/inventory/edit',
            editInv
        );
    }

    findInv() {
        return this.http.get(
            environment.api_url + '/api/inventory/findInventory'
        );
    }

    findZone() {
        return this.http.get(
            environment.api_url + '/api/zone/findZone' 
        );
    }
    findProduct() {
        return this.http.get(
            environment.api_url + '/api/products/findProducts' 
        );
    }
    findUser() {
        return this.http.get(
            environment.api_url + '/api/users/findUser' 
        );
    }
    findId(invId: number) {
        return this.http.get(
            environment.api_url + '/api/inventory/findById?id=' + invId,

        );
    }
}
