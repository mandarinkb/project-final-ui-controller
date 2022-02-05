import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,  throwError  } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthenService } from './authen.service';
import { LoginService } from './login.service';
import { Response } from 'src/app/shared/response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authServ: AuthenService,
              private loginServ: LoginService) { }

    private isRefreshing = false;
    // private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.addTokenHeader(request, this.authServ.getAuthenticated());
    return next.handle(request)
    .pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }

    }));
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({headers: new HttpHeaders({'Authorization': `Bearer ${token}`})});
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      // this.refreshTokenSubject.next(null);
        return this.loginServ.refreshToken().pipe(
          switchMap((token: Response) => {
            console.log('new token : ', token.access_token);
            this.isRefreshing = false;
            this.authServ.setAuthenticated(token.access_token);
            this.authServ.setRefreshToken(token.refresh_token);
            // this.refreshTokenSubject.next(token.access_token);
            return next.handle(this.addTokenHeader(request, token.access_token));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            this.loginServ.logOut();
            return throwError(err);
          })
        );
    }
  }
}


