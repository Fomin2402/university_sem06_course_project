import { Component, OnDestroy, OnInit, HostListener } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { getUserIsAdmin } from "src/app/store/selectors";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnDestroy, OnInit {
  icon: Record<string, string> = {
    homes: "assets/icons/list.svg",
    activeHomes: "assets/icons/list.svg",
    apps: "assets/icons/shopping-bag.svg",
    activeApps: "assets/icons/shopping-bag.svg",
    messages: "assets/icons/dollar-sign.svg",
    activeMessages: "assets/icons/dollar-sign.svg",
    clients: "assets/icons/user.svg",
    activeClients: "assets/icons/user.svg",
  };
  isUserAdmin!: boolean;
  hideSidebar: boolean = true;

  private subscription!: Subscription;

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.subscription = new Subscription();
    this.subscription.add(
      this.store
        .pipe(select(getUserIsAdmin))
        .subscribe((isUserAdmin: boolean) => (this.isUserAdmin = isUserAdmin))
    );
  }

  switchSidebar(): void {
    this.hideSidebar = !this.hideSidebar;
  }

  @HostListener("click", ["$event"])
  listenLocalClick(event: MouseEvent): void {
    event.stopImmediatePropagation();
  }

  @HostListener("document:click")
  hide(): void {
    this.hideSidebar = true;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
