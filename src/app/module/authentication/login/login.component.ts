import { ISignInResponse } from './../../../shared/services/auth/payload.interface';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { take } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { IUser } from './../../../shared/interfaces/user.interface';
import { ToastService } from 'src/app/shared/services/toast.service';
import { MENU_WEB } from 'src/app/shared/constants/sidebar-menu.constant';
import { SidebarMenu } from 'src/app/shared/interfaces/sidebar-menu.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class LoginComponent implements OnInit {
  user: IUser | null = null;
  imageUrlBackgroung = './assets/images/Background.png';
  imageUrl = './assets/images/logoeasyshop.png';
  imageUrlBackgroud = './assets/images/login-image.jpeg';
  constructor(
    private _authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this._authService.user$.subscribe(res => {
      this.user = res;
    })
  }

  private _toastService = inject(ToastService);

  errorDialog(error: any) {
    console.log(error.error.message)
    // console.log(error.status);
    
    if (error.status === 401) {
      this._toastService.addSingle('error', 'เข้าสู่ระบบล้มเหลว', 'รหัสผ่านของคุณไม่ถูกต้อง');
    } else if (error.error.message == 'NO_USER_FOUND') {
      this._toastService.addSingle('error', 'เข้าสู่ระบบล้มเหลว', 'ไม่พบผู้ใช้งานในระบบ');
    } else {
      this._toastService.addSingle('error', 'เกิดข้อผิดพลาด', 'เกิดข้อผิดพลาดจากระบบ');
    }
  }

  username: string = '';
  password: string = '';
  dataPackageJson: any;
  redirectURL: string = '';

  ngOnInit() {
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      this.redirectURL = params['redirectURL'];
    })
  }

  notiError() {
    this.messageService.add({ severity: 'warn', summary: 'เข้าสู่ระบบ', detail: 'กรอก username หรือ password มากกว่า 6ตัว' });
  }

  onInputChange(event: any) {
    let inputValue = event.target.value.toLowerCase().trim();
    event.target.value = inputValue.replace(/[\u0E00-\u0E7F]/g, '');
  }

  onInputChangeTrim(event: any) {
    let inputValue = event.target.value.trim();
    event.target.value = inputValue;
  }

  onLogin() {

    if (this.username.length < 5 && this.password.length > 5) {
      this.notiError();
    } else {
      this._authService
        .signIn({
          username: this.username,
          password: this.password,
        })
        .pipe(take(1))
        .subscribe({
          next: (res: any) => {
            console.log(res);
            const user= res.data
            this._authService.token =user.token;
            this._authService.user = {
              ...user
            };
      
            this._authService.isLoggedIn = true;
            this.router.navigate(['/dashboard']).then(() => {
              this._toastService.addSingle('success', 'เข้าสู่ระบบสำเร็จ', 'คุณได้เข้าสู่ระบบเรียบร้อยแล้ว');
            });
          },
          error: error => {
            this.errorDialog(error)
          },
        }
      );
    }


  }


  findMatchingMenus(codesToCompare: string[], menuArray: SidebarMenu[]): SidebarMenu[] {
    return menuArray.filter(menu => codesToCompare.includes(menu.code));
  }

}


