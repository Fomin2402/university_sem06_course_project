import { Component, OnDestroy, OnInit, HostListener } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { getIsUserAdmin } from "src/app/store/selectors";

@Component({
  selector: "agencyapp-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnDestroy, OnInit {
  icon: Record<string, string> = {
    homes: "assets/icons/home.svg",
    activeHomes: "assets/icons/home-active.svg",
    apps: "assets/icons/appointments.svg",
    activeApps: "assets/icons/appointments-active.svg",
    messages: "assets/icons/chat.svg",
    activeMessages: "assets/icons/active-main-chat.svg",
    agentMessages: "assets/icons/agents-chat.svg",
    activeAgentMessages: "assets/icons/active-agents-chat.svg",
    agents: "assets/icons/agents.svg",
    activeAgents: "assets/icons/agents-active.svg",
    clients: "assets/icons/clients.svg",
    activeClients: "assets/icons/clients-active.svg",
    settings: "assets/icons/settings.svg",
    activeSettings: "assets/icons/settings-active.svg",
    payment: "assets/icons/payment.svg",
    activePayment: "assets/icons/payment-active.svg",
  };
  isUserAdmin!: boolean;
  hideSidebar: boolean = true;

  private subscription!: Subscription;

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.subscription = new Subscription();
    this.subscription.add(
      this.store
        .pipe(select(getIsUserAdmin))
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
