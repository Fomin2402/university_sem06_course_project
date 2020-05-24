import { filter, map, take } from "rxjs/operators";
import { select, Store } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  CanActivate,
  CanActivateChild,
  Router,
  UrlTree,
} from "@angular/router";

import { getUserProfile } from "src/app/store/selectors/profile.selectors";

@Injectable()
export class AdminGuard implements CanActivate, CanActivateChild {
  constructor(private store: Store<IAppState>, private router: Router) {}

  canActivateChild(): Observable<boolean | UrlTree> {
    return this.checkIsUserAdmin().pipe(
      map((res: boolean) => (res ? res : this.router.createUrlTree(["/"])))
    );
  }

  canActivate(): Observable<boolean | UrlTree> {
    return this.checkIsUserAdmin().pipe(
      map((res: boolean) => (res ? res : this.router.createUrlTree(["/"])))
    );
  }

  private checkIsUserAdmin(): Observable<boolean> {
    return this.store.pipe(
      select(getUserProfile),
      filter((user: IUser | null) => !!user),
      take(1),
      map((user: IUser) => !!user.isAdmin)
    );
  }
}
