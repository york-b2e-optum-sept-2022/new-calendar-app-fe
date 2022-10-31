import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  emailInput: String = "";
  firstnameInput: String = "";
  lastnameInput: String = "";
  passwordInput: String = "";

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onCreateAccountSubmit() {
    console.log()
    this.userService.onCreateAccountSubmit(this.emailInput, this.firstnameInput, this.lastnameInput, this.passwordInput)
  }

}
