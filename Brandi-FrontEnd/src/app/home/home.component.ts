import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private auth : AuthService) { 
    this.auth.isLoggedIn().subscribe((res) => {});
  }

  ngOnInit() {
   if(this.auth.isAuthenticated()) console.log(this.auth.user);
  }

}
