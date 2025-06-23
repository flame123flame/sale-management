import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from '../service/customers.service';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { SharedAppModule } from 'src/app/shared/shared-app.module';
import { take } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-addCustomers',
  templateUrl: './addCustomers.component.html',
  styleUrls: ['./addCustomers.component.css'],
  standalone: true,
  imports: [PrimeNgModule, SharedAppModule],
})
export class AddCustomersComponent implements OnInit {

  secSelection = new FormGroup({
    id: new FormControl<number | null>(null),
    fullName: new FormControl<string>('',Validators.required),
    email: new FormControl<string>('',[Validators.required, Validators.email]),
    phone: new FormControl('',[Validators.required,Validators.pattern('^[0-9]{10}$')]),
    address: new FormControl<string>('',Validators.required),
  })

  action: string = 'ADD';

  constructor(private service: CustomersService,private router: Router,private route: ActivatedRoute,private checks: Router,private toast: ToastService, ) { }

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
      if(!this.secSelection.valid){
        this.toast.addSingle('warn', 'แจ้งเตือน','กรุณากรอกข้อมูลให้ครบถ้วน');
        return;
      }
      if(this.action === 'ADD') {
      this.service.createCustomer(this.secSelection.value).subscribe({next: (response: any) => {
        this.toast.addSingle('success', 'เพิ่มลูกค้าสำเร็จ', 'ลูกค้าถูกเพิ่มเรียบร้อยแล้ว');
        this.router.navigate(["customers"]);
      },
      error: (err) => {
        this.toast.addSingle('error', 'เพิ่มลูกค้าไม่สำเร็จ', err.error.messageTh || 'เกิดข้อผิดพลาดในการเพิ่มลูกค้า');
      }
      });
      }else if(this.action == 'EDIT'){
        this.service.editCustomer(this.secSelection.value).subscribe({next: (response: any) => {
          this.toast.addSingle('success', 'แก้ไขข้อมูลลูกค้าสำเร็จ', 'ข้อมูลลูกค้าถูกแก้ไขเรียบร้อยแล้ว');
          this.router.navigate(["customers"]);
        },
        error: (err) => {
          this.toast.addSingle('error', 'แก้ไขข้อมูลลูกค้าไม่สำเร็จ', err.error.messageTh || 'เกิดข้อผิดพลาดในการแก้ไขข้อมูลลูกค้า');
        }
        });
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
