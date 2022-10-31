import {IEvent} from "./IEvent";

export interface IUser {
  id?: number,
  email: String,
  firstname: String,
  lastname: String,
  password: String
  createdEvents?: IEvent
}
