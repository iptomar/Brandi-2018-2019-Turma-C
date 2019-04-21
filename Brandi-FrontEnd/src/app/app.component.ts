import { Component, ElementRef } from '@angular/core';
import { User, AuthService } from './services/auth/auth.service';
import { isBoolean } from 'util';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private ADMIN_TYPE_NAME : string = AuthService.ADMIN_USER_TYPE;

  public logout() : void {
    this.auth.logout().subscribe(() => {});
  }

  private onRouterOutletActivate(event)  {
    this.elementRef.nativeElement.querySelectorAll(".nav-link, .dropdown-item").forEach((elm : any) => elm.classList.remove("active"));
    let elm = this.elementRef.nativeElement.querySelector('[routerLink="'+this.router.url+'"');
    if(elm) {
      if(elm.classList.contains("dropdown-item")) {
        elm.parentNode.parentNode.querySelector("a").classList.add("active");
      }
      elm.classList.add("active");
    }
  }

  constructor(private auth: AuthService, private elementRef:ElementRef, private router : Router) {}
}
