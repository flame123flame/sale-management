import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { SharedAppModule } from 'src/app/shared/shared-app.module';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AddCustomersComponent } from './addCustomers/addCustomers.component';

const routes: Routes = [
  { path: '', component: CustomersComponent },
  {path: 'addCustomers', component: AddCustomersComponent}
];

@NgModule({
  declarations: [],
    imports: [RouterModule.forChild(routes), PrimeNgModule, SharedAppModule, HttpClientModule],
})
export class CustomersModule { }
