import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {IEvent} from "./interfaces/IEvent";
import {IUser} from "./interfaces/IUser";
import {UserService} from "./user.service";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  $isCreatingEvent = new Subject<boolean>();
  createdEvent!: IEvent;
  $createdEvent = new Subject<IEvent>()
  loggedInUser!: IUser;
  $eventsList = new BehaviorSubject<IEvent[] | null>(null)
  eventsList!: IEvent[];

  constructor(
    private httpService: HttpService,
    private userService: UserService
  ) {
    this.userService.$loggedInUser.subscribe(
      loggedInUser => {
        this.loggedInUser = loggedInUser
      }
    )
  }

  onCreateEventClick() {
    this.$isCreatingEvent.next(true)
  }

  onShowEventList() {
    this.$isCreatingEvent.next(false)
  }

  onCreateEventSubmit(eventNameInput: String, eventDescInput: String) {
    if (eventNameInput === "") {
      console.log('event name is blank')
      return;
    }
    if (eventDescInput === "") {
      console.log('event description is blank')
      return;
    }
    this.createdEvent = {
      eventName: eventNameInput,
      eventDesc: eventDescInput
    }
    this.httpService.createNewEvent(this.createdEvent).subscribe({
      next: (createdEvent) => {
        this.$createdEvent.next(this.createdEvent)
        this.addEventToUser(this.createdEvent);
      },
      error: (err) => {
        console.log(err)
      }
    })

  }

  addEventToUser(createdEvent: IEvent) {
    this.httpService.getAllEvents().subscribe(
      eventsList => {
        this.eventsList = eventsList
        console.log(this.eventsList)
            const foundEvent = this.eventsList.find((event) => {
              return event.eventName === createdEvent.eventName && event.eventDesc === createdEvent.eventDesc
            });
            console.log(foundEvent)
        if (foundEvent) {
          if (this.loggedInUser.id && foundEvent.id) {
            this.httpService.addEventToUser(this.loggedInUser.id, foundEvent.id).subscribe({
              next: (addedEventToUser) => {
                console.log(addedEventToUser)
              },
              error: (err) => {
                console.log(err)
              }
            })
          }
        }
      }
    )
  }


}
