import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {IUser} from "./interfaces/IUser";
import {IEvent} from "./interfaces/IEvent";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  getAllUsers() {
    return this.httpClient.get<IUser[]>('http://localhost:8080/api/user');
  }

  createNewUser(newUser: IUser) {
    return this.httpClient.post<IUser>('http://localhost:8080/api/user', newUser);
  }

  createNewEvent(newEvent: IEvent) {
    return this.httpClient.post<IEvent>('http://localhost:8080/api/event', newEvent);
  }

  getAllEvents() {
    return this.httpClient.get<IEvent[]>('http://localhost:8080/api/event');
  }

  addEventToUser(userId: number, eventId: number) {
    let params = new HttpParams()
      .set('user_id', userId)
      .set('event_id', eventId)
    return this.httpClient.put<IUser>('http://localhost:8080/api/user?user_id=', params);
  }

}
