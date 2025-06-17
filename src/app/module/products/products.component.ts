import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: true,
  imports: [CardModule, ButtonModule]
})

export class ProductsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
