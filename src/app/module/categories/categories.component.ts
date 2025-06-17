import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { SharedAppModule } from 'src/app/shared/shared-app.module';
import { CategoriesService } from './service/categories.service';
import { Router } from '@angular/router';

export interface Categories{
  name:string;
  discription:string;
  id:number;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PrimeNgModule, SharedAppModule],
})
export class CategoriesComponent implements OnInit {
  
  constructor(private service: CategoriesService, private _cdr:ChangeDetectorRef,private router:Router){}
  categoriesFind: Categories[] = [];

  ngOnInit() {
      this.findCategories();
  }

  findCategories(){
    this.service.findCategories().subscribe((response:any) =>{
      this.categoriesFind = response.date;
      this._cdr.markForCheck();
    })
  }

  deleteCategories(categoriesId: number){
    this.service.deleteCategories(categoriesId).subscribe((response:any)=>{
      this.findCategories();
    })
  }

  route(){
    this.router.navigate(["categories/addCategories"]);
  }
  edit(categoriesId:number){
    this.router.navigate(["categories/addCategories"],{ queryParams: {categoriesId: categoriesId, action:"EDIT"}});

  }

  detail(categoriesId: number){
    this.router.navigate(["user/addUser"],{queryParams: {categoriesId : {categoriesId, action:"DETAUL"}}})
  }
  

}
