import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Password } from 'primeng/password';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { SharedAppModule } from 'src/app/shared/shared-app.module';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { take } from 'rxjs';

export interface addUser {
  nickName: string;
  fullName: string;
  username: string;
  id: number;
}

@Component({
  selector: 'app-addUser',
  templateUrl: './addUser.component.html',
  styleUrls: ['./addUser.component.css'],
  standalone: true,
  imports: [PrimeNgModule, SharedAppModule],
})


export class AddUserComponent implements OnInit {

  secSection = new FormGroup({
    id: new FormControl<number | null>(null),
    fullName: new FormControl<string>('',Validators.required),
    nickName: new FormControl<string>('',Validators.required),
    username: new FormControl<string>('',Validators.required),
    password: new FormControl<string>('',Validators.required),
  });

  action: string = 'ADD';

  constructor(private fb: FormBuilder, private service: UserService, 
    private route: ActivatedRoute, private checks: Router, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      if (params['action'] === 'EDIT') {
        this.action = 'EDIT';
        const userId = Number(params['userId']);
          this.secSection.get('password')?.disable();
        if (userId) {
          this.findById(userId);
        }
      }else if (params['action'] == 'DETAIL') { 
        this.action = 'DETAIL';
        const userId = Number(params['userId']);
        this.findById(userId);
        this.secSection.disable();
      }
    });
  }
  
  save() {
    console.log(this.secSection.value)
    if(this.action === 'ADD') {
    this.service.createUser(this.secSection.value).subscribe((response: any) => {
    })
    }else if(this.action == "EDIT"){
      this.edit();
    }
  }

  edit() {
    this.service.editUser(this.secSection.value).subscribe((response: any) => {
      if (response.status === 200) {
        this.checks.navigate(["user"]);
      }
    })
  }

  check() {
    this.checks.navigate(["user"]);
  }

  findById(userId: number) {
    this.service.findId(userId).subscribe((response: any) => {
      this.secSection.patchValue(
        {
          id: response.data.id,
          fullName: response.data.fullName,
          nickName: response.data.nickName,
          username: response.data.username,
          password: response.data.password
        }
      );
    });
  }

  checkForm(){
    this.secSection.get('password')?.disable();
  }
  goBack(){
    this.router.navigate(['user']);
  }
}