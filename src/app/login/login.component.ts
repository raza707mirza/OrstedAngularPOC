import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../Services/user.service';
import { TokenModel } from '../Models/token-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  cookieService: CookieService;
  userService: UserService;
  router: Router;

  labelText: string;

  constructor(formBuilder: FormBuilder, cookieService: CookieService, userService: UserService, router: Router) { 
    this.form = formBuilder.group({
            email: ['',Validators.required],
            password: ['',Validators.required]
        });

    this.cookieService = cookieService;
    this.userService = userService;
    this.router = router;
    this.labelText = "";
  }

  ngOnInit() {
  }

  login(  ){
    const val = this.form.value;    
    if (val.email && val.password) {
        this.userService.GetToken(val.email, val.password)
        .then((token: TokenModel) => {
          this.cookieService.set('authenticationtoken',token.token);
          this.labelText = "Success";
          this.router.navigate(['user-list']);
        }, (error:any)=>{
          this.labelText = error.error;
        });
    }
    
    this.labelText = "Please fill in the required fields";
  }

}
