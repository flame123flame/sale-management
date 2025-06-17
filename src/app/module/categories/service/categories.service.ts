import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

constructor(private http: HttpClient) { }

findCategories(){
    return this.http.get(
        environment.api_url + 'api/categories/findCategories',
    );
}

createCategories(createCategories: Object){
    return this.http.post(
        environment.api_url + 'api/categories/create',
        createCategories
    );
}

findId(categoriesId: number){
    return this.http.get(
        environment.api_url + '/api/categories/findById?id=' + categoriesId,

    );
}

editCategories(editCategories: Object){
    return this.http.post(
        environment.api_url + 'api/categories/edit',
        editCategories
    );
}

deleteCategories(categoriesId:number){
    return this.http.delete(
        environment.api_url + 'api/categories/delete?id=' + categoriesId
    )
}
  
}
