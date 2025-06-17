import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import { Router } from '@angular/router';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { SharedAppModule } from 'src/app/shared/shared-app.module';

export interface User {
  nickName: string;
  fullName: string;
  username: string;
  id: number;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PrimeNgModule, SharedAppModule],
})
export class UserComponent implements OnInit {

  constructor(private service: UserService, private _cdr: ChangeDetectorRef, private router: Router) { }
  userFind: User[] = [];
  visibleDelete: boolean = false;
  userId: number | null = null;

  ngOnInit() {
    this.findUser();
  }

  findUser() {
    this.service.findUser().subscribe((response: any) => {
      this.userFind = response.data;
      this._cdr.markForCheck();
    })
  }


  confirmDelete(userId: number) {
    this.visibleDelete = true;
    this.userId = this.userId;

  }

  deleteUser(){
    this.service.deleteUser(this.userId!).subscribe((response: any) => {
      this.findUser();
    })
  }

    adminCheck(checkUse: string){
      return checkUse !=='admin';
  }

  route() {
    this.router.navigate(["user/addUser"]);
  }

  edit(userId: number) {
    this.router.navigate(["user/addUser"], { queryParams: { userId: userId, action: "EDIT" } });
  }

  detail(userId: number) {
   this.router.navigate(["user/addUser"], { queryParams: { userId: userId,  action: "DETAIL"} });
  }
}

