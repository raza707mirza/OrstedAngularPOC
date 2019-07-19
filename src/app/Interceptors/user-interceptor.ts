import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";

@Injectable()
export class UserInterceptor implements HttpInterceptor {
  cookieService: CookieService;
  router: Router;
  constructor(cookieService:CookieService, router: Router) { 
    this.cookieService = cookieService;
    this.router = router;
  }
  //function which will be called for all http calls
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var token = this.cookieService.get('authenticationtoken');
    
    const authReq = request.clone({
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Bearer " + token
      })
    });

    return next.handle(authReq).pipe(
      tap(
        event => {
          //logging the http response to browser's console in case of a success
          if (event instanceof HttpResponse) {
            console.log("api call success :", event);
          }
        },
        error => {
          if(error.status == 401)
            this.router.navigate(['login']);
          //logging the http response to browser's console in case of a failuer
          if (event instanceof HttpResponse) {
            console.log("api call error :", event);
          }
        }
      )
    );
  }
}