import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { SharedAppModule } from 'src/app/shared/shared-app.module';
import { InventoryService } from '../service/inventory.service';

export interface Inventory {
  id: number;
  priceSale: number;
  quantity: number;
  status: string;
  productId: number;
  zoneId: number;
  userId: number;
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
   standalone: true,
    imports: [PrimeNgModule, SharedAppModule]
})
export class InventoryComponent implements OnInit {

  constructor(private route: Router ,private service : InventoryService, private crd:ChangeDetectorRef) { }


  findInventory: Inventory[] = [];
  zone: { 
    discountPercent:number ,id: number, name: string }[] = [];
    
  products: { id: number, name: string }[] = [];
  users:Array<{ id: number, nickName: string,fullName: string }> = [];
  invId: number | null = null;
  visibleDelete: boolean = false;
  zoneId: number | null = null;
  inventoryId: number | null = null;

  ngOnInit() {
    this.findInv();
    this.findZone();
    this.findProduct();
    this.findUser();


  }


  findZone() {
    this.service.findZone().subscribe((response: any) => {
      this.zone = response.data;
      this.crd.markForCheck();
    })
  }

  findProduct() {
    this.service.findProduct().subscribe((response: any) => {
      this.products = response.data;
      this.crd.markForCheck();
    })
  }

  findUser() {
    this.service.findUser().subscribe((response: any) => {
      this.users = response.data;
      this.crd.markForCheck();
    })
  } 

  zoneName(zoneId: number): string {
    const zone = this.zone.find(z => z.id === zoneId);
    return zone ? zone.name : '';
  }

  zoneDiscount(zoneId: number): string {
    const zone = this.zone.find(z => z.id === zoneId);
    return zone ? `${zone.discountPercent}%` : '';
  }

  productName(productId: number): string {
    const product = this.products.find(p => p.id === productId);
    return product ? product.name : '';
    
    
  }

  userName(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? `${user.nickName} ${user.fullName}` : '';
  }

  

  findInv() {

     this.service.findInv().subscribe((response: any) => {
       this.findInventory = response.data;
      this.crd.markForCheck();
     })
  } 

  addZone(){
    this.route.navigate(['inventory/addZone']);
  }

  zoneList(){
    this.route.navigate(['inventory/zone']);
  }

  addInv() {
    this.route.navigate(['inventory/addInventory']);
  }
  edit(inventoryId: number) {
    this.route.navigate(["inventory/addInventory"], { queryParams: { inventoryId: inventoryId, action: "EDIT" } });
  }
  details(inventoryId: number) {
    this.route.navigate(["inventory/addInventory"], { queryParams: { inventoryId: inventoryId, action: "DETAIL" } });
  }

  confirmDelete(inventoryId: number) {
    this.visibleDelete = true;
    this.inventoryId = inventoryId;

  }
  deleteInv() {
    this.visibleDelete = false;
    if (this.inventoryId) {
      this.service.deleteInv(this.inventoryId).subscribe((response: any) => {
        this.findInv();
      });
    }
  }
}
