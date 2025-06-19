import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CustomersService } from '../customers/service/customers.service';
import { ProductsService } from './service/products.service';
import { SharedAppModule } from 'src/app/shared/shared-app.module';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { Route, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface Products{
  name: string,
  description: string,
  price: number,
  stock_quantity: number,
  is_active: string,
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

  constructor(private service: ProductsService, private crd: ChangeDetectorRef, private router: Router) { }
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
    this.service.deleteProducts(this.productsId!).subscribe((response: any) => {
      this.findProducts();
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

  getStatusLabel(stock_quantity: number): string {
    return stock_quantity > 0 ? 'มีสินค้า' : 'สินค้าหมด';
  } 

  edit(productsId: number) {
    this.router.navigate(["products/addProducts"], { queryParams: { productsId: productsId, action: "EDIT" } });
  }
}

