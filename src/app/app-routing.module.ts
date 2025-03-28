import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./users/user/user.component";
import { ServersComponent } from "./servers/servers.component";
import { ServerComponent } from "./servers/server/server.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth-guard.service";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { ErrorComponent } from "./error/error.component";
import { serverResolver } from "./servers/server/server-resolver.service";

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent },
    ]
  },
  {
    path: 'servers', canActivateChild: [AuthGuard], component: ServersComponent, children: [
      { path: ':id', component: ServerComponent, resolve: {server: serverResolver} },
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] },
    ]
  },
  // { path: 'not-found', component: PageNotFoundComponent },
  { path: 'not-found', component: ErrorComponent, data: { message: 'Page not found!' } },
  {
    path: '**',
    redirectTo: '/not-found',
    pathMatch: 'full'
  }
]


@NgModule({
  // useHash adds # to the url, and it is usefull to the older routes that have trouble with the default html5 routing
  // imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }