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
import { DatasheetPage3Component } from './datasheet/pages/datasheet-page3/datasheet-page3.component';
import { DatasheetPage4Component } from './datasheet/pages/datasheet-page4/datasheet-page4.component';
import { DatasheetPage5Component } from './datasheet/pages/datasheet-page5/datasheet-page5.component';
import { DatasheetPage6Component } from './datasheet/pages/datasheet-page6/datasheet-page6.component';
import { DatasheetPage7Component } from './datasheet/pages/datasheet-page7/datasheet-page7.component';
import { DatasheetPage8Component } from './datasheet/pages/datasheet-page8/datasheet-page8.component';

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
    DatasheetPage2Component,
    DatasheetPage3Component,
    DatasheetPage4Component,
    DatasheetPage5Component,
    DatasheetPage6Component,
    DatasheetPage7Component,
    DatasheetPage8Component
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
