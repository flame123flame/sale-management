import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { SharedAppModule } from 'src/app/shared/shared-app.module';
import { Categories } from '../categories.component';
import { take } from 'rxjs';
import { CategoriesService } from '../service/categories.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.scss'],
  standalone: true,
  imports: [PrimeNgModule, SharedAppModule],
})
export class AddCategoriesComponent implements OnInit {
  secSelection = new FormGroup({
    id: new FormControl<number | null>(null),
    name: new FormControl<string>('', Validators.required),
    description: new FormControl<string>('', Validators.required),
  
  })

  action: string = 'ADD';

     

  constructor(private service: CategoriesService,
    private router: Router,
     private route: ActivatedRoute ,
     private checks:Router,
     private toast: ToastService) { }

  ngOnInit() {
      this.action_set();
  }

    action_set(){
      this.route.queryParams.pipe(take(1)).subscribe((params) => {
        if (params['action'] === 'EDIT') {
          this.action = 'EDIT';
          const categoriesId = Number(params['categoriesId']);
          console.log(categoriesId);
          if (categoriesId) {
            this.findByIdCategories(categoriesId);
          }
        }else if (params['action'] == 'DETAIL') { 
          this.action = 'DETAIL';
          const categoriesId = Number(params['categoriesId']);
          console.log(categoriesId);
          
          this.findByIdCategories(categoriesId);
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
      this.service.createCategories(this.secSelection.value).subscribe({next: (response: any) => {
        this.toast.addSingle('success', 'เพิ่มหมวดหมู่สำเร็จ', 'หมวดหมู่ถูกเพิ่มเรียบร้อยแล้ว');
        this.checks.navigate(["categories"]);
      },
      error: (err) => {
        this.toast.addSingle('error', 'เพิ่มหมวดหมู่ไม่สำเร็จ', err.error.messageTh || 'เกิดข้อผิดพลาดในการเพิ่มหมวดหมู่');
      }
      });
      }else if(this.action == 'EDIT'){
        this.service.editCategories(this.secSelection.value).subscribe({next: (response: any) => {
          this.toast.addSingle('success', 'แก้ไขหมวดหมู่สำเร็จ', 'หมวดหมู่ถูกแก้ไขเรียบร้อยแล้ว');
          this.checks.navigate(["categories"]);
        },
        error: (err) => {
          this.toast.addSingle('error', 'แก้ไขหมวดหมู่ไม่สำเร็จ', err.error.messageTh || 'เกิดข้อผิดพลาดในการแก้ไขหมวดหมู่');
        }
        });
      }
    }
  
  
    edit() {
      this.service.editCategories(this.secSelection.value).subscribe((response: any) => {
        if (response.status === 200) {
          this.checks.navigate(["categories"]);
        }
      })
    }
  
    check() {
      this.checks.navigate(["categories"]);
    }
  
    goBack(){
      this.router.navigate(['categories']);
    }
  
    findByIdCategories(categoriesId: number){
      this.service.findId(categoriesId).subscribe((response: any) => {
        this.secSelection.patchValue(
          {
            id: response.data.id,
            name: response.data.name,
            description: response.data.description,
          }
        );
      });
    }
  }
  



