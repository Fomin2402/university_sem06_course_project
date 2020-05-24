import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { API_USER } from "../api-routes";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  public getMyself(): Observable<IUser> {
    return this.http.get<IUser>(API_USER.GET_MYSELF);
  }

  public getUserById(userId: string): Observable<IUser> {
    return this.http.get<IUser>(API_USER.GET_USER_BY_ID(userId));
  }

  public getUsers(): Observable<IUser> {
    return this.http.get<IUser>(API_USER.GET_USERS);
  }
}
