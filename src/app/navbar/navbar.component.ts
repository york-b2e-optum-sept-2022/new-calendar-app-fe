import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {EventService} from "../event.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isCreatingEvent: boolean = false;

  constructor(
    private userService: UserService,
    private eventService: EventService
  ) {
    this.eventService.$isCreatingEvent.subscribe(
      isCreatingEvent => {
        this.isCreatingEvent = isCreatingEvent
      }
    )
  }

  ngOnInit(): void {
  }

  onCreateEventClick() {
    this.eventService.onCreateEventClick()
  }

  onEditAccountClick() {
    this.userService.onEditAccountClick()
  }

  onLogoutClick() {
    this.userService.onLogoutClick()
  }

  showEventList() {
    this.eventService.onShowEventList()
  }

}
