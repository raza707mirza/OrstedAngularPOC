import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular';
  cookieService: CookieService;
  router: Router;
  Authenticated: boolean;
  

  constructor(cookieService: CookieService, router: Router){
    this.cookieService = cookieService;
    this.router = router;
  }

  ngOnInit(): void {
    this.Authenticated = this.IsAuthenticated();
    
    if(this.Authenticated == false)
    {
      this.router.navigate(['login'])
    }
    else
    {
      this.router.navigate(['user-list'])
    }
  }
  
  IsAuthenticated(){
    var token = this.cookieService.get('authenticationtoken');
    if(token == null || token == "")
    return false;
    return true;
  }
}
