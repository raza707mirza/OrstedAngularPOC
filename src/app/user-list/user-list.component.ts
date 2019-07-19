import { Component, OnInit } from '@angular/core';
import { UserModel } from '../Models/user-model';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: UserModel[];
  _userService: UserService;
  constructor(userService: UserService) {
    this._userService = userService;
   }

  ngOnInit() {
    this._userService.GetUsersList()
    .then((response)=>{
      this.users = response;
    });    
  }

}
