import { Component } from '@angular/core';
import {UserService} from "./user.service";
import {EventService} from "./event.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calendar-app-fe';

  isCreatingAccount: boolean = false;
  isLoggedIn: boolean = false;
  isCreatingEvent: boolean = false;

  constructor(
    private userService: UserService,
    private eventService: EventService
  ) {
    this.userService.$isCreatingAccount.subscribe(
      isCreatingAccount => {
        this.isCreatingAccount = isCreatingAccount
      }
    );
    this.userService.$isLoggedIn.subscribe(
      isLoggedIn => {
        this.isLoggedIn = isLoggedIn
      }
    );
    this.eventService.$isCreatingEvent.subscribe(
      isCreatingEvent => {
        this.isCreatingEvent = isCreatingEvent
      }
    );
  }

}
