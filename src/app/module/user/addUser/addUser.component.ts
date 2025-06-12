import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { SharedAppModule } from 'src/app/shared/shared-app.module';

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
    fullName: new FormControl<string>(''),
    nickName: new FormControl<string>(''),
    username: new FormControl<string>(''),
    id: new FormControl<number | null>(null)
  });

  form!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: [''],
      nickName: [''],
      fullName: [''],
      id: 0
    });
  }

  addFrom() {
    const newUser: addUser = this.form.value;
  }
}
