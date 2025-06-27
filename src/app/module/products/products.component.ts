import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CustomersService } from '../customers/service/customers.service';
import { ProductsService } from './service/products.service';
import { SharedAppModule } from 'src/app/shared/shared-app.module';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { Route, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast.service';

export interface Products{
  name: string,
  description: string,
  price: number,
  categories: string;
}


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PrimeNgModule, SharedAppModule]

})

  
export class ProductsComponent implements OnInit {

  constructor(private service: ProductsService, private crd: ChangeDetectorRef, private router: Router, private toast: ToastService) { }
  productsFind: Products[] = []
  visibleDelete: boolean = false;
  productsId: number | null = null;
  categories: { id: number, name: string }[] = [];
  
  ngOnInit(){
    this.findProducts();
    this.loadCategories();

  }

   findProducts() {
    this.service.findProducts().subscribe((response: any) => {
      this.productsFind = response.data;
      this.crd.markForCheck();
    })
  }

  route() {
    this.router.navigate(['products/addProducts']);
  }

  productsList(){
    this.router.navigate(['products/productsList'])
  }


  confirmDelete(productsId: number) {
    this.visibleDelete = true;
    this.productsId = productsId;

  }

  deletePro(){
    this.visibleDelete = false;
    this.service.deleteProducts(this.productsId!).subscribe({
      next: (response: any) => {
      this.findProducts();
      this.toast.addSingle('success', 'ลบสินค้าแล้ว', 'ลบสินค้าสำเร็จแล้ว');
      },
      error: (error: any) => {
        this.toast.addSingle('error', 'ลบสินค้าไม่สำเร็จ', 'ไม่สามารถลบสินค้าได้');
      }
    })
  }

  loadCategories() {
    this.service.getCategories().subscribe((res: any) => {
      this.categories = res.data;
      this.crd.markForCheck();
    });
  }

  categoriesName(categoriesId:number): string{
    const category = this.categories.find(c => c.id === categoriesId);
    return category ? category.name : '-';
  }

  edit(productsId: number) {
    this.router.navigate(["products/addProducts"], { queryParams: { productsId: productsId, action: "EDIT" } });
  }

  detail(productsId: number) {
   this.router.navigate(["products/addProducts"], { queryParams: { productsId: productsId,  action: "DETAIL"} });
  }
}

