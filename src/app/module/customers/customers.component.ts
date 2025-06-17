import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CustomersService } from './service/customers.service';
import { SharedAppModule } from 'src/app/shared/shared-app.module';
import { PrimeNgModule } from 'src/app/shared/primeng.module';

export interface Customers {
  email: string;
  phone: string;
  fullName: string;
  address: string;
  id: number;
}
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [PrimeNgModule, SharedAppModule],
})
export class CustomersComponent implements OnInit {

  constructor(private service: CustomersService, private _cdr: ChangeDetectorRef, private router: Router) { }
  customersFind: Customers[] = [];
  visibleDelete: boolean = false;
  customerId: number | null = null;

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
    this.router.navigate(["customers/addCustomers"], { queryParams: { customerId: customersId, action: "DETAIL" } });
  }

  confirmDelete(customerId: number) {
    this.visibleDelete = true;
    this.customerId = customerId;

  }
  deleteCustomers() {
    this.visibleDelete = false;
    this.service.deleteCustomer(this.customerId!).subscribe((response: any) => {
      this.findCustomers();
    })
  }
}
