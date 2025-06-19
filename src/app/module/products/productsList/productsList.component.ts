import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { SharedAppModule } from 'src/app/shared/shared-app.module';

@Component({
  selector: 'app-productsList',
  templateUrl: './productsList.component.html',
  styleUrls: ['./productsList.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PrimeNgModule, SharedAppModule]
})
export class ProductsListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
