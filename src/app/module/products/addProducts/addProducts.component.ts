import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { SharedAppModule } from 'src/app/shared/shared-app.module';
import { ProductsService } from '../service/products.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';

export interface addProducts {
  id: number;
  name: string;
  description: string;
  category_id: number;
  price: number;
  stock_quantity: number;
  is_active: string;
}

@Component({
  selector: 'app-addProducts',
  templateUrl: './addProducts.component.html',
  styleUrls: ['./addProducts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PrimeNgModule, SharedAppModule, FormsModule, AutoCompleteModule, DropdownModule]
})
export class AddProductsComponent implements OnInit {

  secSection = new FormGroup({
    id: new FormControl<number | null>(null),
    category_id: new FormControl<number | null>(null),
    stock_quantity: new FormControl<number | null>(null),
    name: new FormControl<string>('', Validators.required),
    description: new FormControl<string>('', Validators.required),
    is_active: new FormControl<string>('', Validators.required)
  });

  categoryOptions: { label: string, value: number }[] = [];

  constructor(private fb: FormBuilder, private service: ProductsService,
    private route: ActivatedRoute, private checks: Router, private router: Router) {
  }

  ngOnInit() {
    this.service.getCategories().subscribe((res: any) => {
      this.categoryOptions = res.data.map((cat: any) => ({
        label: cat.name
      }));
    });
  }

  goBack() {
    this.router.navigate(['products']);
  }


  findById(productsId: number) {
    this.service.findId(productsId).subscribe((response: any) => {
      this.secSection.patchValue(
        {
          id: response.data.id,
          name: response.data.name,
          category_id: response.data.category_id,
          stock_quantity: response.data.stock_quantity,
          description: response.data.description,
          is_active: response.data.is_active
        }
      );
    });
  }

}
