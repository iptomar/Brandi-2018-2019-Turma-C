import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/user-management/login/login.component';
import { RegisterComponent } from './pages/user-management/register/register.component';
import { FormComponent } from './pages/user-management/form/form.component';

const routes: Routes = [
  { path: 'user/login' , component : LoginComponent },
  { path: 'user/register', component: RegisterComponent },
  { path: 'user/form', component: FormComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
   exports: [ RouterModule ]
})
export class AppRoutingModule { }
