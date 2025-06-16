import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CustomersService } from './service/customers.service';

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
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  constructor(private service: CustomersService,private _cdr: ChangeDetectorRef,) { }
  customersFind: Customers[] = [];
  ngOnInit() {
  }

   findCustomers() {
    this.service.findCustomers().subscribe((response: any) => {
      this.customersFind = response.data;
      this._cdr.markForCheck();
    })
  }
}
