import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
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
import { DatePipe } from '@angular/common';
import { DatasheetCreateComponent } from './datasheet/datasheet-create/datasheet-create.component';
import { DatasheetEditComponent } from './datasheet/datasheet-edit/datasheet-edit.component';
import { AboutComponent } from './about/about.component';

//caminhos de routerLink e permissoes (guards) necessárias para os poder abrir
const routes: Routes = [
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
  },
  {
    path: "datasheet/create",
    component: DatasheetCreateComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: "datasheet/edit/:id",
    component: DatasheetEditComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "**",
    component: HomeComponent //o unico que pode não conter canActivate
  },
];

@NgModule({
  imports: [HttpClientModule, RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]  ,
  providers: [ Global,DatePipe ]
})
export class AppRoutingModule { }
