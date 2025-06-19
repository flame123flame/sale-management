import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { SharedAppModule } from 'src/app/shared/shared-app.module';
import { CategoriesService } from './service/categories.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';

export interface Categories {
  findId(categoriesId: number): unknown;
  name: string;
  description: string;
  id: number;

}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PrimeNgModule, SharedAppModule],
})
export class CategoriesComponent implements OnInit {

  constructor(private service: CategoriesService, private _cdr: ChangeDetectorRef, private router: Router, private toast: ToastService) { }
  categoriesFind: Categories[] = [];
  visibleDelete: boolean = false;
  categoriesId: number | null = null;

  ngOnInit() {
    this.findCategories();
  }

  findCategories() {
    this.service.findCategories().subscribe((response: any) => {
      this.categoriesFind = response.data;
      this._cdr.markForCheck();
    })
  }


  route() {
    this.router.navigate(["categories/add-categories"]);
  }
  edit(categoriesId: number) {
    this.router.navigate(["categories/add-categories"], { queryParams: { categoriesId: categoriesId, action: "EDIT" } });

  }

  detail(categoriesId: number) {
    this.router.navigate(["categories/add-categories"], { queryParams: { categoriesId: categoriesId, action: "DETAIL" } })
  }

  confirmDelete(categoriesId: number) {

    this.visibleDelete = true;
    this.categoriesId = categoriesId;}

    deleteCategories () {
      this.visibleDelete = false;
      this.service.deleteCategories(this.categoriesId!).subscribe({
        next: (response: any) => {
          this.findCategories();
          this.toast.addSingle('success', 'ลบหมวดหมู่สำเร็จ', 'หมวดหมู่ถูกลบเรียบร้อยแล้ว');
        },
        error:(err) => {
          const errorMessage = err.error.messageTh || 'เกิดข้อผิดพลาดในการลบหมวดหมู่';
          this.toast.addSingle('error', 'ลบหมวดหมู่ไม่สำเร็จ', errorMessage);
        }
      });

    }
  }