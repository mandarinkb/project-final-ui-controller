import { Component, OnInit } from '@angular/core';
import { AuthenService } from 'src/app/shared/authen.service';
import { Router } from '@angular/router';
import { RememberMeService } from 'src/app/shared/remember-me.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  logoImgSrc = 'assets/images/geer.png';
  userImgSrc = 'assets/images/user-icon-1.jpg';
  userName = 'web scrapping';
  userPost = 'controller';

  username: string;
  constructor(private authen: AuthenService ,
              private router: Router,
              private remember: RememberMeService) { }

  ngOnInit() {
    this.username = this.authen.getUsername();
  }

  logOut() {
    this.authen.clearAllSession();
    this.router.navigate(['/login']); // ไปยังหน้าดังกล่าว
  }


}
