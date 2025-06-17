import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { SharedAppModule } from 'src/app/shared/shared-app.module';

@Component({
  selector: 'app-addProducts',
  templateUrl: './addProducts.component.html',
  styleUrls: ['./addProducts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PrimeNgModule, SharedAppModule]
})
export class AddProductsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goBack(){
    this.router.navigate(['products']);
  }
}
