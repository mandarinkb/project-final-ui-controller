import { Injectable } from '@angular/core';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { LoginService } from './login.service';
import { AuthenService } from './authen.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router,
              private login: LoginService,
              private auth: AuthenService) { }

  // กำนหนด guard ในส่วนของการใช้งานกับ  canActivate
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url; // เก็บ url ที่พยายามจะเข้าใช้งาน
    // จะผ่านเข้าใช้งานได้เมื่อ คืนค่าเป็น true โดยเข้าไปเช็คค่าจากคำสั่ง checkLogin()
    return this.checkLogin(url); // คืนค่าการตรวจสอบสถานะการล็อกอิน
  }

  // ฟังก์ชั่นเช็คสถานะการล็อกอิน รับค่า url ที่ผู้ใช้พยายามจะเข้าใช้งาน
  checkLogin(url: string): boolean {
    // ถ้าตรวจสอบค่าสถานะการล็อกอินแล้วเป็น true ก็ให้คืนค่า true กลับอกไป
    // if (this.login.isLoggedIn) { return true; }

    // ถ้าตรวจสอบ session ถ้า username มีค่าจะคืนค่า แสดงว่า login แล้ว ให้คืนค่า true กลับอกไป
    if (this.auth.getUsername() !== '') { return true; }

    // แต่ถ้ายังไม่ได้ล็อกอิน ให้เก็บ url ที่พยายามจะเข้าใช้งาน สำหรับไว้ลิ้งค์เปลี่ยนหน้า
    this.login.redirectUrl = url; // redirectUrl เป็นตัวแปรที่อยู่ใน LoginService

    // ลิ้งค์ไปยังหน้าล็อกอิน เพื่อล็อกอินเข้าใช้งานก่อน
    this.router.navigate(['/login']);
    return false; // คืนค่า false กรณียังไม่ได้ล็อกอิน
  }
}
