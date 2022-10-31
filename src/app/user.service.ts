import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {ILogin} from "./interfaces/ILogin";
import {IUser} from "./interfaces/IUser";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  $isCreatingAccount = new Subject<boolean>();
  $isLoggedIn = new Subject<boolean>();

  loginUser!: ILogin;
  createdUser!: IUser;
  loggedInUser!: IUser;
  $loggedInUser = new Subject<IUser>()

  userList: IUser[] = []

  constructor(private httpService: HttpService) {
    this.getUserList();
  }

  getUserList() {
    this.httpService.getAllUsers().subscribe({
      next: (userList) => {
        this.userList = userList
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  onLoginSubmit(emailInput: String, passwordInput: String) {
    if (emailInput === "") {
      console.log('email is blank')
      return;
    }
    if (passwordInput === "") {
      console.log('password is blank')
      return;
    }
    this.loginUser = {
      email: emailInput,
      password: passwordInput
    }
    const userFound = this.userList.find((user: IUser) => {
      return user.email === this.loginUser.email && user.password === this.loginUser.password
    })
    if (userFound === undefined) {
      console.log('user and password not found')
      return;
    }
    this.$loggedInUser.next(userFound)
    this.$isLoggedIn.next(true)
  }

  onNeedAccountClick() {
    console.log('need account clicked')
    this.$isCreatingAccount.next(true)
  }

  onCreateAccountSubmit(emailInput: String, firstnameInput: String, lastnameInput: String, passwordInput: String) {
    if (emailInput === "") {
      console.log('email is blank')
      return;
    }
    if (!emailInput.includes('@') || !emailInput.includes('.')) {
      console.log('email needs @ and .')
      return;
    }
    if (firstnameInput === "") {
      console.log('firstname is blank')
      return;
    }
    if (lastnameInput === "") {
      console.log('lastname is blank')
      return;
    }
    if (passwordInput === "") {
      console.log('password is blank')
      return;
    }
    this.createdUser = {
      email: emailInput,
      firstname: firstnameInput,
      lastname: lastnameInput,
      password: passwordInput
    }
    this.getUserList();
    const foundEmail = this.userList.find(user =>
    user.email.toUpperCase() === this.createdUser.email.toUpperCase())
    if (foundEmail) {
      console.log('email already used')
      return;
    }
    if (!foundEmail) {
      this.httpService.createNewUser(this.createdUser).subscribe({
        next: (newUser) => {
          console.log(newUser)
          console.log('New User made')
          this.$isCreatingAccount.next(false)
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
    this.getUserList();
  }

  onLogoutClick() {
    this.$isLoggedIn.next(false)
  }

  onEditAccountClick() {

  }


}
