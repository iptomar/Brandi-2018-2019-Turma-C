import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService, User } from 'src/app/services/auth/auth.service';
import { UsersService, UserType } from 'src/app/services/users/users.service';
import { ElementDef } from '@angular/core/src/view';
import { Global } from 'src/app/Global';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public _users : Array<User>;
  public _searchWord : string;
  public _onEdit : number = -1;
  public _usersTypes : Array<UserType>;
  public messageEditErr : string;
  public messageEditSuccess : string;

  constructor(private users : UsersService, private elementRef : ElementRef) {
    this._searchWord="";
    this.users.getUserTypes("").subscribe((userTypes) => {this._usersTypes=userTypes});
    this._users=[];
    this.messageEditErr ="";
    this.messageEditSuccess ="";
  }

  public sendEditUser(event) : void {
    event.preventDefault();
    this.messageEditErr ="";
    this.messageEditSuccess ="";
    window.scroll(0,0);
    let u : User = Object.assign({},this._users[this._onEdit]); //clona os dados
    u.birthday=Global.stringToDate(event.target.birthday.value);
    u.full_name=event.target.full_name.value;
    u.address=event.target.address.value;
    u.cellphone=event.target.cellphone.value;
    u.id_type_user=event.target.id_type_user.value;
    u.type_user=event.target.id_type_user.options[event.target.id_type_user.selectedIndex].text;
    u.qualifications=event.target.qualifications.value;
    u.title=event.target.title.value;
    this.users.changeUser(u).subscribe((result) => {
      if(!result.error) {
        this.messageEditSuccess = result.message;
        this._users[this._onEdit]=u;//atualizamos os dados para o cliente
        setTimeout(() => {
          this.messageEditErr ="";
          this.messageEditSuccess ="";
          this.editMode(-1,true);
        }, 3 * 1000);//espera 3 segundos antes de sair da pagina de edição
      }else this.messageEditErr = result.message;
    });
  }

  public editMode(edit : number, alterado : boolean = false ) {
    if(edit < 0 && !alterado) if(!confirm("Tem a certeza? todos os dados alterados serão perdidos")) return;
    this._onEdit=edit;
  }

  public get isEditing() {
    return this._onEdit != -1;
  }
  
  public deleteUser(index : number) : void {
    if(!confirm("Tem a certeza que pretende eliminar? Esta opção é permanente.")) return;
    this.users.deleteUser(this._users[index].id).subscribe((result) => {
      if(!result.error) {
        this._users.splice(index,1);
      }
      confirm(result.message);
    });
  }

  public searchUser(event) : void {
    if(event != null) {
      event.preventDefault();
      if(event.target.searchBox.value === this._searchWord) return;
      this._searchWord = event.target.searchBox.value;
    }
    this.users.getUsers(this._searchWord).subscribe((users_list) => {
      this._users=users_list;
    });
  }

  ngOnInit() {
    this.searchUser(null);
  }

}
