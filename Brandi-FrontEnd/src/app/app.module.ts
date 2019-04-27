import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserRegisterComponent } from './admin/user-register/user-register.component';
import { DatasheetComponent } from './datasheet/datasheet.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { DatasheetCreateComponent } from './datasheet/datasheet-create/datasheet-create.component';
import { DatasheetPage1Component } from './datasheet/pages/datasheet-page1/datasheet-page1.component';
import { DatasheetPage2Component } from './datasheet/pages/datasheet-page2/datasheet-page2.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    UserListComponent,
    UserDetailsComponent,
    UserRegisterComponent,
    DatasheetComponent,
    CategoriesComponent,
    DatasheetCreateComponent,
    DatasheetPage1Component,
    DatasheetPage2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
