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
    
  constructor(private service: AddZoneService,
      private router: Router,
      private route: ActivatedRoute ,
      private checks:Router,
      private toast: ToastService) { }

      
  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['inventory']);
  }

  save() {
    this.service.createZone(this.secSelection.value).subscribe((response: any) => {
    })
  }
}
