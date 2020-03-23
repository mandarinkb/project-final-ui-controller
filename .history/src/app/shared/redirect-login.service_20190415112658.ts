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

}
