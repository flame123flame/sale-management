import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { SharedAppModule } from 'src/app/shared/shared-app.module';
import { AddZoneComponent } from './add-zone/add-zone.component';

const routes: Routes = [
  {path: '', component: InventoryComponent},
  {path: 'addZone', component: AddZoneComponent},

];

@NgModule({
  declarations: [],
    imports: [RouterModule.forChild(routes), PrimeNgModule, SharedAppModule, HttpClientModule],
})
export class InventoryModule { }
