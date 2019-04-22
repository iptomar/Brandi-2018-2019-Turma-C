import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { Global } from './Global';
import { NoAuthGuard } from './guards/no-auth/no-auth.guard';
import { AdminGuard } from './guards/admin/admin.guard';
import { UserListComponent } from './admin/user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserRegisterComponent } from './admin/user-register/user-register.component';
import { DatasheetComponent } from './datasheet/datasheet.component';
import { CategoriesComponent } from './admin/categories/categories.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent //o unico que pode não conter canActivate
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [ NoAuthGuard ]
  },
  {
    path: "admin/user/list",
    component: UserListComponent,
    canActivate: [ AdminGuard ]
  },
  {
    path: "admin/user/register",
    component: UserRegisterComponent,
    canActivate: [ AdminGuard ]
  },
  {
    path: "admin/categories",
    component: CategoriesComponent,
    canActivate: [ AdminGuard ]
  },
  {
    path: "user/details",
    component: UserDetailsComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: "datasheet",
    component: DatasheetComponent,
    canActivate: [ AuthGuard ]
  }
];

@NgModule({
  imports: [HttpClientModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]  ,
  providers: [ Global ]
})
export class AppRoutingModule { }
