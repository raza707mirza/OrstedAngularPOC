import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { UserInterceptor } from './Interceptors/user-interceptor';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { UserService } from './Services/user.service';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { RouterModule, Routes } from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import { UserListItemComponent } from './user-list-item/user-list-item.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'user-list', component: UserListComponent }
];

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
   ],
  declarations: [ AppComponent, HelloComponent, LoginComponent, UserListComponent, UserListItemComponent ],
  bootstrap:    [ AppComponent ],
  providers: [UserService, CookieService, 
  {
      provide: HTTP_INTERCEPTORS,
      useClass: UserInterceptor,
      multi: true
    },
    {provide: APP_BASE_HREF, useValue: ''}
    ]
})
export class AppModule { }
