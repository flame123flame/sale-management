import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PrimeNgModule } from "src/app/shared/primeng.module";
import { SharedAppModule } from "src/app/shared/shared-app.module";
import { CustomersComponent } from "../customers/customers.component";
import { CategoriesComponent } from "./categories.component";


const routes: Routes = [
  { path: '', component: CategoriesComponent }
];

@NgModule({
  declarations: [],
    imports: [RouterModule.forChild(routes), PrimeNgModule, SharedAppModule,HttpClientModule],
})
export class CategoriesModule { }
