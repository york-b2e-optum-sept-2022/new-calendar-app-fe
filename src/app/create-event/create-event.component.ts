import { Component, OnInit } from '@angular/core';
import {EventService} from "../event.service";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  eventNameInput: String = "";
  eventDescInput: String = "";

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
  }

  onCreateEventSubmit() {
    this.eventService.onCreateEventSubmit(this.eventNameInput, this.eventDescInput)
  }



}
