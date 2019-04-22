import { Component, OnInit, ElementRef,ViewChild, Renderer2 } from '@angular/core';
import { UserType, UsersService } from 'src/app/services/users/users.service';
import { Global } from 'src/app/Global';
import { User } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})

export class UserRegisterComponent implements OnInit {
  @ViewChild('passwordNew') passwordNew : ElementRef;
  @ViewChild('passwordNewConf') passwordNewConf : ElementRef;

  public messageSuccess : string;
  public messageErr : string;
  public _usersTypes : Array<UserType>;
  constructor(private users : UsersService, private elementRef : ElementRef, private renderer : Renderer2) {
    this.users.getUserTypes("").subscribe((userTypes) => {this._usersTypes=userTypes});
    this.messageSuccess="";
    this.messageErr="";
  }

  public randomPW() : void {
    let randomstring = Math.random().toString(36).slice(-8);
    this.passwordNew.nativeElement.value=randomstring;
    this.passwordNewConf.nativeElement.value=randomstring;
  }

  private static clearFields(target : any) {
    target.title.value="";
    target.qualifications.value="";
    target.id_type_user.value=target.id_type_user.options[0].value;
    target.cellphone.value="";
    target.address.value="";
    target.full_name.value="";
    target.email.value="";
    target.birthday.value="";
    target.passwordNew.value="";
    target.passwordNewConf.value="";
  }

  public registerUser(event) : void {
    event.preventDefault();
    this.messageSuccess="";
    this.messageErr="";
    window.scroll(0,0);
    if(event.target.passwordNew.value != event.target.passwordNewConf.value) {
      event.target.passwordNew.value="";
      event.target.passwordNewConf.value="";
      this.messageErr="As palavras-chave não coencidem";
    }else {
      let u : User = {id: -1, last_login: null, register_date: null, title: event.target.title.value, qualifications: event.target.qualifications.value, type_user: event.target.id_type_user.options[event.target.id_type_user.selectedIndex].text, id_type_user: event.target.id_type_user.value ,cellphone: event.target.cellphone.value, address: event.target.address.value, full_name: event.target.full_name.value, email: event.target.email.value,birthday: Global.stringToDate(event.target.birthday.value)}; //clona os dados
      this.users.registerUser(u, event.target.passwordNew.value).subscribe((result) => {
        if(!result.error) {
          this.messageSuccess=result.message;
          UserRegisterComponent.clearFields(event.target);
        }else this.messageErr=result.message;
      });
    }

  }

  ngOnInit() {
    Global.enableShowPassword(this.elementRef,this.renderer);
  }

}
