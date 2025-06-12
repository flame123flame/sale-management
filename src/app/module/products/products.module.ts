import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { UserComponent } from '../user/user.component';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { SharedAppModule } from 'src/app/shared/shared-app.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ProductsComponent }
];

@NgModule({
  declarations: [ProductsComponent],
    imports: [RouterModule.forChild(routes), PrimeNgModule, SharedAppModule],
})
export class ProductsModule { }
