import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from '../service/customers.service';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { SharedAppModule } from 'src/app/shared/shared-app.module';
import { take } from 'rxjs';

@Component({
  selector: 'app-addCustomers',
  templateUrl: './addCustomers.component.html',
  styleUrls: ['./addCustomers.component.css'],
  standalone: true,
  imports: [PrimeNgModule, SharedAppModule],
})
export class AddCustomersComponent implements OnInit {
  [x: string]: any;

  secSelection = new FormGroup({
    id: new FormControl<number | null>(null),
    fullName: new FormControl<string>(''),
    email: new FormControl<string>(''),
    phone: new FormControl<number | null>(null),
    address: new FormControl<string>(''),
  })

  action: string = 'ADD';

  constructor(private service: CustomersService,private router: Router,private route: ActivatedRoute,private checks: Router) { }

  ngOnInit() {
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      if (params['action'] === 'EDIT') {
        this.action = 'EDIT';
        const customersId = Number(params['customerId']);
        console.log(customersId);
        if (customersId) {
          this.findByIdCustomer(customersId);
        }
      }else if (params['action'] == 'DETAIL') { 
        this.action = 'DETAIL';
        const customersId = Number(params['customerId']);
        console.log(customersId);
        
        this.findByIdCustomer(customersId);
        this.secSelection.disable();
      }
    });
}

  save() {
     console.log(this.secSelection.value)
    if(this.action === 'ADD') {
    this.service.createCustomer(this.secSelection.value).subscribe((response: any) => {
    })
    }else if(this.action == "EDIT"){
      this.edit();
    }
  }


  edit() {
    this.service.editCustomer(this.secSelection.value).subscribe((response: any) => {
      if (response.status === 200) {
        this.checks.navigate(["customers"]);
      }
    })
  }

  check() {
    this.checks.navigate(["customers"]);
  }

  goBack(){
    this.router.navigate(['customers']);
  }

  findByIdCustomer(customersId: number){
    this.service.findId(customersId).subscribe((response: any) => {
      this.secSelection.patchValue(
        {
          id: response.data.id,
          fullName: response.data.fullName,
          email: response.data.email,
          phone: response.data.phone,
          address: response.data.address
        }
      );
    });
  }
}
