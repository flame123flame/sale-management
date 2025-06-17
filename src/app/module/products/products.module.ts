import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { SharedAppModule } from 'src/app/shared/shared-app.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ProductsComponent }
];

@NgModule({
  declarations: [],
    imports: [RouterModule.forChild(routes), PrimeNgModule, SharedAppModule],
})
export class ProductsModule { }
