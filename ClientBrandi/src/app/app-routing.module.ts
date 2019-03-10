import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/user-management/login/login.component';
import { RegisterComponent } from './pages/user-management/register/register.component';

const routes: Routes = [
  { path: 'user/login' , component : LoginComponent },
  { path: 'user/register', component: RegisterComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
   exports: [ RouterModule ]
})
export class AppRoutingModule { }
