import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

import { API_USER } from "../api-routes";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  public getMyself(): Observable<IUser> {
    return this.http
      .get<IUserMongo>(API_USER.GET_MYSELF)
      .pipe(map((user: IUserMongo) => user.user));
  }

  public getUserById(userId: string): Observable<IUser> {
    return this.http
      .get<IUserMongo>(API_USER.GET_USER_BY_ID(userId))
      .pipe(map((user: IUserMongo) => user.user));
  }

  public getUsers(): Observable<IUser> {
    return this.http.get<IUser>(API_USER.GET_USERS);
  }
}
