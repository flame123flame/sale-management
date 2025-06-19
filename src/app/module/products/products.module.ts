import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { SharedAppModule } from 'src/app/shared/shared-app.module';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AddProductsComponent } from './addProducts/addProducts.component';
import { ProductsListComponent } from './productsList/productsList.component';

const routes: Routes = [
  {path: '', component: ProductsComponent },
  {path: 'addProducts', component: AddProductsComponent},
  {path: 'productsList', component: ProductsListComponent},
];

@NgModule({
  declarations: [],
    imports: [RouterModule.forChild(routes), PrimeNgModule, SharedAppModule, HttpClientModule],
})
export class ProductsModule { }
