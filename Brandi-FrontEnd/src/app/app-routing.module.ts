import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { PagesComponent } from './pages/pages.component';
import { HttpClientModule } from '@angular/common/http';
import { Global } from './Global';
import { NoAuthGuard } from './guards/no-auth/no-auth.guard';
import { AdminGuard } from './guards/admin/admin.guard';
import { UserListComponent } from './admin/user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [ NoAuthGuard ]
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [ AdminGuard ]
  },
  {
    path: "admin/user/list",
    component: UserListComponent,
    canActivate: [ AdminGuard ]
  },
  {
    path: "user/details",
    component: UserDetailsComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: "pages",
    component: PagesComponent,
    canActivate: [ AuthGuard ]
  }
];

@NgModule({
  imports: [HttpClientModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]  ,
  providers: [ Global ]
})
export class AppRoutingModule { }
