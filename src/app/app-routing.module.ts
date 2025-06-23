import { LayoutType } from './layout/layout.service';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './module/home/home.component';
import { NoAuthGuard } from './core/guards/noAuth.guard';
import { DashboardComponent } from './module/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/sign-in',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: LayoutType.AUTH
    },
    children: [
      { path: '', component: DashboardComponent }
    ]
  },
  {
    path: 'categories',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: LayoutType.AUTH
    },
    children: [
      { path: '', loadChildren: () => import('./module/categories/categories.module').then(m => m.CategoriesModule), }
    ]
  },
 
  
 
  {
    path: 'sign-in',
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: LayoutType.NO_AUTH
    },
    children: [
      { path: '', loadChildren: () => import('./module/authentication/login/login.module').then(m => m.LoginModule), }
    ]
  },
   {
    path: 'user',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: LayoutType.AUTH
    },
    children: [
      { path: '', loadChildren: () => import('./module/user/user.module').then(m => m.UserModule), }
    ]
  },

  {
    path: 'products',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: LayoutType.AUTH
    },
    children: [
      { path: '', loadChildren: () => import('./module/products/products.module').then(m => m.ProductsModule), }
    ]
  },

  {
    path: 'customers',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: LayoutType.AUTH
    },
    children: [
      { path: '', loadChildren: () => import('./module/customers/customers.module').then(m => m.CustomersModule), }
    ]
  },

  {
    path: 'inventory',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: LayoutType.AUTH
    },
    children: [
      { path: '', loadChildren: () => import('./module/inventory/inventory.module').then(m => m.InventoryModule), }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
