import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { SharedAppModule } from 'src/app/shared/shared-app.module';
import { ProductsService } from '../../products/service/products.service';
import { AddZoneService } from '../service/add-zone.service';

export interface Zone{
  name: string,
  description: string,
  discountPercent: number,
}


@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [PrimeNgModule, SharedAppModule],
})
export class ZoneComponent implements OnInit {

  findZones: Zone[] = [];
  visibleDelete: boolean = false;

  constructor(private router: Router, private service: AddZoneService, private crd: ChangeDetectorRef) { }

  ngOnInit() {
    this.findZone();
  }

  addZone() {
    this.router.navigate(['inventory/addZone']);
  }
  
  findZone() {
    this.service.findZone().subscribe((response: any) => {
      this.findZones = response.data;
      this.crd.markForCheck();
    })
  }
  goBack() {
    this.router.navigate(['inventory']);
  }

  edit(zoneId: number) {
    this.router.navigate(["inventory/addZone"], { queryParams: { zoneId: zoneId, action: "EDIT" } });

  }

  detail(zoneId: number) {
    this.router.navigate(["inventory/addZone"], { queryParams: { zoneId: zoneId, action: "DETAIL" } })
  }

}
