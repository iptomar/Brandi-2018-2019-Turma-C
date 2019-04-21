import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../services/auth/auth.service';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  private messageSuccess : string;
  private messageErr : string;
  private messagePassSuccess : string;
  private messagePassErr : string;

  constructor(private auth : AuthService, private users : UsersService) {
    this.messageErr="";
    this.messageSuccess="";
    this.messagePassErr="";
    this.messagePassSuccess="";
  }

  private editOwnUser(event) : void {
    event.preventDefault();
    let u : User = Object.assign({},this.auth.user); //clona os dados
    u.birthday=new Date(event.target.birthday.value);
    u.full_name=event.target.full_name.value;
    u.address=event.target.address.value;
    u.cellphone=event.target.cellphone.value;
    u.qualifications=event.target.qualifications.value;
    u.title=event.target.title.value;
    this.messageErr="";
    this.messageSuccess="";
    this.users.changeUser(u).subscribe((result) => {
      if(!result.error) {
        this.auth.user=u;//atualizamos os dados para o cliente
        this.messageSuccess=result.message;
      }else this.messageErr=result.message;
    });
  }

  private changePw(event) : void {
    event.preventDefault();
    if(event.target.passwordNew.value === "" || event.target.passwordNewConf.value === "" || event.target.passwordOld.value === "") {
      this.messagePassErr = "Insira todos os campos obrigatórios";
    } else if(event.target.passwordNew.value !== event.target.passwordNewConf.value) {
      this.messagePassErr = "A palavra-chave nova e a palavra-chave nova de confirmação não são iguais";
    }else {
      this.messagePassErr="";
      this.messagePassSuccess="";
      this.users.changeOwnPassword(event.target.passwordOld.value,event.target.passwordNew.value).subscribe((result) =>  {
        event.target.passwordOld.value="";
        if(!result.error) {
          event.target.passwordNew.value="";
          event.target.passwordNewConf.value="";
          this.messagePassSuccess=result.message;
        }else this.messagePassErr=result.message;
      });
    }
  }

  ngOnInit() {
  }

}
