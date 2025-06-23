import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Password } from 'primeng/password';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { SharedAppModule } from 'src/app/shared/shared-app.module';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { take } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast.service';

export interface addUser {
  nickName: string;
  fullName: string;
  username: string;
  id: number;
}

@Component({
  selector: 'app-addUser',
  templateUrl: './addUser.component.html',
  styleUrls: ['./addUser.component.css'],
  standalone: true,
  imports: [PrimeNgModule, SharedAppModule],
})


export class AddUserComponent implements OnInit {

  secSection = new FormGroup({
    id: new FormControl<number | null>(null),
    fullName: new FormControl<string>('',Validators.required),
    nickName: new FormControl<string>('',Validators.required),
    username: new FormControl<string>('',Validators.required),
    password: new FormControl<string>('',Validators.required),
  });

  action: string = 'ADD';

  constructor(private fb: FormBuilder, private service: UserService, 
    private route: ActivatedRoute, private router: Router, private toast: ToastService,) { }

  ngOnInit() {
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      if (params['action'] === 'EDIT') {
        this.action = 'EDIT';
        const userId = Number(params['userId']);
          this.secSection.get('password')?.disable();
        if (userId) {
          this.findById(userId);
        }
      }else if (params['action'] == 'DETAIL') { 
        this.action = 'DETAIL';
        const userId = Number(params['userId']);
        this.findById(userId);
        this.secSection.disable();
      }
    });
  }
  
  save() {
      if(!this.secSection.valid){
        this.toast.addSingle('warn', 'แจ้งเตือน','กรุณากรอกข้อมูลให้ครบถ้วน');
        return;
      }
      if(this.action === 'ADD') {
      this.service.createUser(this.secSection.value).subscribe({next: (response: any) => {
        this.toast.addSingle('success', 'เพิ่มผู้ใช้งานสำเร็จ', 'ผู้ใช้งานถูกเพิ่มเรียบร้อยแล้ว');
        this.router.navigate(["user"]);
      },
      error: (err) => {
        this.toast.addSingle('error', 'เพิ่มผู้ใช้งานไม่สำเร็จ', err.error.messageTh || 'เกิดข้อผิดพลาดในการเพิ่มผู้ใช้งาน');
      }
      });
      }else if(this.action == 'EDIT'){
        this.service.editUser(this.secSection.value).subscribe({next: (response: any) => {
          this.toast.addSingle('success', 'แก้ไขผู้ใช้งานสำเร็จ', 'ผู้ใช้งานถูกแก้ไขเรียบร้อยแล้ว');
          this.router.navigate(["user"]);
        },
        error: (err) => {
          this.toast.addSingle('error', 'แก้ไขผู้ใช้งานไม่สำเร็จ', err.error.messageTh || 'เกิดข้อผิดพลาดในการแก้ไขผู้ใช้งาน');
        }
        });
      }
    }

  edit() {
    this.service.editUser(this.secSection.value).subscribe((response: any) => {
      if (response.status === 200) {
        this.router.navigate(["user"]);
      }
    })
  }

  check() {
    this.router.navigate(["user"]);
  }

  findById(userId: number) {
    this.service.findId(userId).subscribe((response: any) => {
      this.secSection.patchValue(
        {
          id: response.data.id,
          fullName: response.data.fullName,
          nickName: response.data.nickName,
          username: response.data.username,
          password: response.data.password
        }
      );
    });
  }

  checkForm(){
    this.secSection.get('password')?.disable();
  }
  goBack(){
    this.router.navigate(['user']);
  }
  
}

