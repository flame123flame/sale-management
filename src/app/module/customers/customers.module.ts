import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { SharedAppModule } from 'src/app/shared/shared-app.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: CustomersComponent }
];

@NgModule({
  declarations: [CustomersComponent],
    imports: [RouterModule.forChild(routes), PrimeNgModule, SharedAppModule],
})
export class CustomersModule { }
