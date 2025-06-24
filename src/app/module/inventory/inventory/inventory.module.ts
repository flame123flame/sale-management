import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { SharedAppModule } from 'src/app/shared/shared-app.module';
import { AddZoneComponent } from '../zone/add-zone/add-zone.component';
import { ZoneComponent } from '../zone/zone.component';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';

const routes: Routes = [
  {path: '', component: InventoryComponent},
  {path: 'addZone', component: AddZoneComponent},
  {path: 'zone', component: ZoneComponent},
  {path: 'addInventory', component: AddInventoryComponent},
];

@NgModule({
  declarations: [
    // AddInventoryComponent
  ],
    imports: [RouterModule.forChild(routes), PrimeNgModule, SharedAppModule, HttpClientModule,AddInventoryComponent],
})
export class InventoryModule { }
