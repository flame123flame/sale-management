import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import { SharedAppModule } from 'src/app/shared/shared-app.module';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export interface User {
  nickName: string;
  fullName: string;
  username: string;
  id: number;
}
interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [PrimeNgModule, SharedAppModule],
})
export class DashboardComponent implements OnInit {

  secSection = new FormGroup({
    firstName: new FormControl<string>(''),
    lastName: new FormControl<string>(''),
    age: new FormControl<number | null>(null)
  });

  userFind: User[] = [];

constructor(private service: UserService) {}

ngOnInit() {

  this.findUser();
}



  findUser() {
    this.service.findUser().subscribe((response: any) => {
      this.userFind = response.data
    })
  }

}
