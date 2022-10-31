import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailInput: String = "";
  passwordInput: String = "";

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onLoginClick() {
    console.log(this.emailInput)
    console.log(this.passwordInput)
    this.userService.onLoginSubmit(this.emailInput, this.passwordInput)
  }

  onNeedAccountClick() {
    this.userService.onNeedAccountClick()
  }


}
