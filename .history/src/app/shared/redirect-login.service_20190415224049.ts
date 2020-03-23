import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthenService } from './authen.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectLoginService {

  constructor(private toastr: ToastrService ,
              private router: Router ,
              private authen: AuthenService) { }

  redirectLogin() {
    this.toastr.warning('token หมดอายุ กรุณาเข้าสู่ระบบอีกครั้ง', 'Token expired.');
    this.router.navigate(['/login']); // ไปยังหน้าดังกล่าว
    this.authen.clearAllSession();
  }
}
