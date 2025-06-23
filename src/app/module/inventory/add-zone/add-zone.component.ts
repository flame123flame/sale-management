import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { ToastService } from 'src/app/shared/services/toast.service';
import { SharedAppModule } from 'src/app/shared/shared-app.module';
import { CategoriesService } from '../../categories/service/categories.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddZoneService } from '../service/add-zone.service';

@Component({
  selector: 'app-add-zone',
  templateUrl: './add-zone.component.html',
  styleUrls: ['./add-zone.component.css'],
  standalone: true,
  imports: [PrimeNgModule, SharedAppModule],
})
export class AddZoneComponent implements OnInit {
  secSelection = new FormGroup({
      id: new FormControl<number | null>(null),
      name: new FormControl<string>('', Validators.required),
      description: new FormControl<string>(''),
      discountPercent: new FormControl<number | null>(null, Validators.required),
    })
    
    action: string = 'ADD';

  constructor(private service: AddZoneService,
      private router: Router,
      private route: ActivatedRoute ,
      private toast: ToastService,) { }

      
  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['inventory']);
  }

  save() {
      if(!this.secSelection.valid){
        this.toast.addSingle('warn', 'แจ้งเตือน','กรุณากรอกข้อมูลให้ครบถ้วน');
        return;
      }
      if(this.action === 'ADD') {
      this.service.createZone(this.secSelection.value).subscribe({next: (response: any) => {
        this.toast.addSingle('success', 'เพิ่มหมวดหมู่สำเร็จ', 'หมวดหมู่ถูกเพิ่มเรียบร้อยแล้ว');
        this.router.navigate(["inventory"]);
      },
      error: (err) => {
        this.toast.addSingle('error', 'เพิ่มหมวดหมู่ไม่สำเร็จ', err.error.messageTh || 'เกิดข้อผิดพลาดในการเพิ่มหมวดหมู่');
      }
      });
      }else if(this.action == 'EDIT'){
        this.service.editZone(this.secSelection.value).subscribe({next: (response: any) => {
          this.toast.addSingle('success', 'แก้ไขหมวดหมู่สำเร็จ', 'หมวดหมู่ถูกแก้ไขเรียบร้อยแล้ว');
          this.router.navigate(["inventory"]);
        },
        error: (err) => {
          this.toast.addSingle('error', 'แก้ไขหมวดหมู่ไม่สำเร็จ', err.error.messageTh || 'เกิดข้อผิดพลาดในการแก้ไขหมวดหมู่');
        }
        });
      }
    }

    edit() {
    this.service.editZone(this.secSelection.value).subscribe((response: any) => {
      if (response.status === 200) {
        this.router.navigate(["inventory"]);
      }
    })
  }
}
