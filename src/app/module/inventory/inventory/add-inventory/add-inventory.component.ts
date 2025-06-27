import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators ,ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { ToastService } from 'src/app/shared/services/toast.service';
import { SharedAppModule } from 'src/app/shared/shared-app.module';
import { InventoryService } from '../../service/inventory.service';
 import { RadioButtonModule } from 'primeng/radiobutton';


export interface AddInventory {
  id: number;
  priceSale: number;
  quantity: number;
  status: string;
  productId: number;
  zoneId: number;
  userId: number;
    
}
  
  



@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PrimeNgModule, SharedAppModule, FormsModule, AutoCompleteModule, DropdownModule, RadioButtonModule,ReactiveFormsModule]
})
export class AddInventoryComponent implements OnInit {



  secSection = new FormGroup({
    id: new FormControl<number | null>(null),
    priceSale: new FormControl<number | null>(null, Validators.required),
    quantity: new FormControl<number | null>(null, Validators.required),
    status: new FormControl<string>('', Validators.required),
    productId: new FormControl<number | null>(null, Validators.required),
    zoneId: new FormControl<number | null>(null, Validators.required),
    userId: new FormControl<number | null>(null),
  });
  statusOptions: { label: string, value: string }[] = [
    { label: 'เปิดการขายสินค้า', value: 'ACTIVE' },
    { label: 'ปิดการขายสินค้า', value: 'DISABLE' }]

  productsList: { label: string, value: number }[] = [];
  zoneList: { label: string, value: number }[] = [];
  zoneDiscount: { label: number, value: number }[] = [];
  productPrice: { label: number, value: number }[] = [];

  action: string = 'ADD';
ingredient: any;
  constructor(private fb: FormBuilder
    , private service: InventoryService
    , private router: Router, private route: ActivatedRoute, private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.getProduct();
    this.getZone();
    this.editOrDetail();
  }

  goBack() {
    this.router.navigate(['inventory']);
  }

  findByIdInv(inventoryId: number) {
    this.service.findId(inventoryId).subscribe((res: any) => {
      this.secSection.patchValue({
        id: res.data.id,
        userId: res.data.userId,
        priceSale: res.data.priceSale,
        quantity: res.data.quantity,
        status: res.data.status,
        productId: res.data.productId,
        zoneId: res.data.zoneId,
      });
    });
  }

  save() {
      if(!this.secSection.valid){
        this.toast.addSingle('warn', 'แจ้งเตือน','กรุณากรอกข้อมูลให้ครบถ้วน');
        return;
      }
      if(this.action === 'ADD') {
      this.service.createInv(this.secSection.value).subscribe({next: (response: any) => {
        this.toast.addSingle('success', 'เพิ่มสินค้าสำเร็จ', 'สินค้าถูกเพิ่มเรียบร้อยแล้ว');
        this.router.navigate(["inventory"]);
        
      },
      error: (err) => {
        this.toast.addSingle('error', 'เพิ่มสินค้าไม่สำเร็จ', err.error.messageTh || 'เกิดข้อผิดพลาดในการเพิ่มสินค้า');
      }
      });
      }else if(this.action === 'EDIT'){
        this.service.editInv(this.secSection.value).subscribe({next: (response: any) => {
          this.toast.addSingle('success', 'แก้ไขสินค้าสำเร็จ', 'สินค้าถูกแก้ไขเรียบร้อยแล้ว');
          this.router.navigate(["inventory"]);
        },
        error: (err) => {
          this.toast.addSingle('error', 'แก้ไขสินค้าไม่สำเร็จ', err.error.messageTh || 'เกิดข้อผิดพลาดในการแก้ไขสินค้า');
        }
        });
      }
    }

   edit(){
    this.service.editInv(this.secSection.value).subscribe((response: any) => {
      if (response.status === 200) {
        this.router.navigate(["inventory"]);
      }
    });
   }

   getProduct() {
    this.service.findProduct().subscribe((res: any) => {
      this.productsList = res.data.map((item: any) => ({
        label: item.name,
        value: item.id
      }));
      this.productPrice = res.data.map((item: any) => ({
        label: item.price,
        value: item.id
      }));
    }); }

    getZone() {
      this.service.findZone().subscribe((res: any) => {
        this.zoneList = res.data.map((item: any) => ({
          label: item.name,
          value: item.id
        }));
        this.zoneDiscount = res.data.map((item: any) => ({
          label: item.discountPercent,
          value: item.id
        }));
      });
    }

    getZoneDiscount(zoneId: number | null): number | null {
      const match = this.zoneDiscount.find(d => d.value === zoneId);
      return match ? match.label : null;
    }

    getProductPrice(productId: number | null): number | null {
      const match = this.productPrice.find(p => p.value === productId);
      return match ? match.label : 0;
    }
  editOrDetail() {
    this.route.queryParams.subscribe((params) => {
      if (params['action'] === 'EDIT') {
        this.action = 'EDIT';
        const inventoryId = Number(params['inventoryId']);
        if (inventoryId) {
          this.findByIdInv(inventoryId);
        }
      } else if (params['action'] === 'DETAIL') {
        this.action = 'DETAIL';
        const inventoryId = Number(params['inventoryId']);
        this.findByIdInv(inventoryId);
        this.secSection.disable();
      }
    }); }

    getTotalPrice(priceSale: number| null | undefined , quantity: number| null | undefined): number {
      return (priceSale ?? 0) * (quantity ?? 0);
    }

    getPricediscount(priceSale: number| null | undefined, zoneDiscount: number| null | undefined): number{
      return priceSale ? priceSale - (priceSale * (zoneDiscount ?? 0) / 100) : 0;
    }

    getTotalPriceWithDiscount(priceSale: number| null | undefined, quantity: number| null | undefined, zoneDiscount: number| null | undefined): number {
      const discountedPrice = this.getPricediscount((priceSale ?? 0), (zoneDiscount ?? 0));
      return discountedPrice * (quantity ?? 0);
    }

    getProfit(getPricediscount: number| null | undefined, productPrice: number| null | undefined): number {
      return (getPricediscount ?? 0) - (productPrice ?? 0);

    }
    // console.log('getProfit', this.getProfit(100, 50));
    

    getTotalProfit(getProfit: number| null | undefined, quantity: number| null | undefined): number {
      return (getProfit ?? 0) * (quantity ?? 0);
    }
    

    


  
}

