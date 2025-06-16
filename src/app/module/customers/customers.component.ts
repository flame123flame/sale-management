import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CustomersService } from './service/customers.service';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { SharedAppModule } from 'src/app/shared/shared-app.module';
import { Router } from '@angular/router';

export interface Customers {
  email: string;
  phone: string;
  fullName: string;
  address: string;
  id: number;
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PrimeNgModule, SharedAppModule],
})
export class CustomersComponent implements OnInit {

  constructor(private service: CustomersService,private _cdr: ChangeDetectorRef,private router: Router) { }
  customersFind: Customers[] = [];


  ngOnInit() {
    this.findCustomers();
  }

  findCustomers() {
    this.service.findCustomers().subscribe((response: any) => {
      this.customersFind = response.data;
      this._cdr.markForCheck();
    })
  }

  route() {
    this.router.navigate(["customers/addCustomers"]);
  }

  edit(customersId: number) {
    this.router.navigate(["customers/addCustomers"], { queryParams: { customerId: customersId, action: "EDIT" } });
  }

  detail(customersId: number) {
   this.router.navigate(["customers/addCustomers"], { queryParams: { customerId: customersId,  action: "DETAIL"} });
  }

  deleteCustomers(customerId: number){
   this.service.deleteCustomer(customerId).subscribe((response: any) => {
      this.findCustomers();
    })
  }
}
