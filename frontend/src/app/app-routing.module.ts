import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthenticationGuard } from "./common";

const routes: Routes = [
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then((m: any) => m.LoginModule),
  },
  {
    path: "signup",
    loadChildren: () =>
      import("./pages/signup/signup.module").then((m: any) => m.SignupModule),
  },
  {
    path: "recovery-password",
    loadChildren: () =>
      import("./pages/recovary-password/recovary-password.module").then(
        (m: any) => m.RecoveryPasswordModule
      ),
  },
  {
    path: "reset-password",
    loadChildren: () =>
      import("./pages/set-password/set-password.module").then(
        (m: any) => m.SetPasswordModule
      ),
  },
  {
    path: "",
    canLoad: [AuthenticationGuard],
    canActivate: [AuthenticationGuard],
    loadChildren: () =>
      import("./main-view/main-view.module").then((m: any) => m.MainViewModule),
  },
  {
    path: "**",
    redirectTo: "",
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
