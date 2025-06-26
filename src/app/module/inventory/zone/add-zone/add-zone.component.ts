import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { ToastService } from 'src/app/shared/services/toast.service';
import { SharedAppModule } from 'src/app/shared/shared-app.module';
import { CategoriesService } from '../../../categories/service/categories.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddZoneService } from '../../service/add-zone.service';

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
    description: new FormControl<string>('', Validators.required),
    discountPercent: new FormControl<number | null>(null, [Validators.required,Validators.min(0),Validators.max(100)]),
  })

  action: string = 'ADD';
  form: any;

  constructor(private service: AddZoneService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastService,) { }


  ngOnInit() {
    this.editOrDetail();
  }

  editOrDetail() {
    this.route.queryParams.subscribe((params) => {
      if (params['action'] === 'EDIT') {
        this.action = 'EDIT';
        const zoneId = Number(params['zoneId']);
        if (zoneId) {
          this.findByIdZone(zoneId);
        }
      } else if (params['action'] == 'DETAIL') {
        this.action = 'DETAIL';
        const zoneId = Number(params['zoneId']);
        this.findByIdZone(zoneId);
        this.secSelection.disable();
      }
    });
  }

  goBack() {
    this.router.navigate(['inventory/zone']);
  }

  save() {
    if (!this.secSelection.valid) {
      this.toast.addSingle('warn', 'แจ้งเตือน', 'กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    if (this.action === 'ADD') {
      this.service.createZone(this.secSelection.value).subscribe({
        next: (response: any) => {
          this.toast.addSingle('success', 'เพิ่มหมวดหมู่สำเร็จ', 'หมวดหมู่ถูกเพิ่มเรียบร้อยแล้ว');
          this.router.navigate(["inventory/zone"]);
        },
        error: (err) => {
          this.toast.addSingle('error', 'เพิ่มหมวดหมู่ไม่สำเร็จ', err.error.messageTh || 'เกิดข้อผิดพลาดในการเพิ่มหมวดหมู่');
        }
      });
    } else if (this.action == 'EDIT') {
      this.service.editZone(this.secSelection.value).subscribe({
        next: (response: any) => {
          this.toast.addSingle('success', 'แก้ไขหมวดหมู่สำเร็จ', 'หมวดหมู่ถูกแก้ไขเรียบร้อยแล้ว');
          this.router.navigate(["inventory/zone"]);
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
        this.router.navigate(["inventory/zone"]);
      }
    })
  }

  findByIdZone(zoneId: number) {
    this.service.findId(zoneId).subscribe((response: any) => {
      this.secSelection.patchValue(
        {
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          discountPercent: response.data.discountPercent
        }
      );
    });
  }

}
