import { Component, OnInit } from '@angular/core';
import { AuthenService } from 'src/app/shared/authen.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  logoImgSrc: string = 'assets/images/geer.png';
  userImgSrc: string = 'assets/images/user-icon-1.jpg';
  userName: string = 'web scrapping';
  userPost: string = 'controller';

  username: string;
  constructor(private authen: AuthenService ,
              private router: Router) { }

  ngOnInit() {
    this.username = this.authen.getUsername();
  }

  logOut() {
    // this.authen.clearAllSession();
    this.router.navigate(['/login']); // ไปยังหน้าดังกล่าว
  }


}
