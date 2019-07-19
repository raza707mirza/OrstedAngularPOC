import { Component, OnInit, Input } from '@angular/core';
import { UserModel, Role } from '../Models/user-model';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.css']
})
export class UserListItemComponent implements OnInit {

  @Input() user: UserModel;

  UserDescription: string;
  constructor() { }

  ngOnInit() {
    this.UserDescription = this.user.firstName + " " + this.user.lastName + " is our " + this.GetRole(); 
    
  }

  GetRole()
  {
    switch(this.user.role)
    {
      case Role.Employee:
      default:
        return "Employee";
      case Role.Manager:
          return "Manager";
    }
  }
}
