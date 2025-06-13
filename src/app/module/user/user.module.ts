import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule, Routes } from '@angular/router';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { SharedAppModule } from 'src/app/shared/shared-app.module';
import { AddUserComponent } from './addUser/addUser.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {path: '', component: UserComponent },
  {path: 'addUser', component: AddUserComponent}
];

@NgModule({
  declarations: [],
    imports: [RouterModule.forChild(routes), PrimeNgModule, SharedAppModule, HttpClientModule],
})
export class UserModule { }
