import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  message : string ="";
  constructor(private app:AppComponent ,private auth : AuthService, private router : Router) { }

  doSubmit(event : any) {
    event.preventDefault();
    this.auth.authenticate(event.target.email.value,event.target.password.value).subscribe((res) => {
      if(res.user === null) {
        event.target.email.value="";
        event.target.password.value="";
        this.message=res.message;
      }else {
        this.router.navigate([""]);
      }
    });
  }

  ngOnInit() {
  }

}
