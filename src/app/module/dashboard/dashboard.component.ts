import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import { SharedAppModule } from 'src/app/shared/shared-app.module';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [PrimeNgModule, SharedAppModule],
})
export class DashboardComponent implements OnInit {

constructor(private service: UserService) {}

  ngOnInit() {

  }
}
