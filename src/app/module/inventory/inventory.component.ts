import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { SharedAppModule } from 'src/app/shared/shared-app.module';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
   standalone: true,
    imports: [PrimeNgModule, SharedAppModule]
})
export class InventoryComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  addZone(){
    this.route.navigate(['inventory/addZone']);
  }
}
