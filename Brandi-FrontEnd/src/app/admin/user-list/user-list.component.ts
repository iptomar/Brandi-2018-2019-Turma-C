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
  private _users : Array<User>;
  private _searchWord : string;
  private _onEdit : number = -1;
  private _usersTypes : Array<UserType>;
  constructor(private users : UsersService, private elementRef : ElementRef) {
    this._searchWord="";
    this.users.getUserTypes("").subscribe((userTypes) => {this._usersTypes=userTypes});
    this._users=[];
  }

  private sendEditUser(event) : void {
    event.preventDefault();
    let u : User = Object.assign({},this._users[this._onEdit]); //clona os dados
    u.birthday=new Date(event.target.birthday.value);
    u.full_name=event.target.full_name.value;
    u.address=event.target.address.value;
    u.cellphone=event.target.cellphone.value;
    u.id_type_user=event.target.id_type_user.value;
    u.type_user=event.target.id_type_user.options[event.target.id_type_user.selectedIndex].text;
    u.qualifications=event.target.qualifications.value;
    u.title=event.target.title.value;
    this.users.changeUser(u).subscribe((result) => {
      if(!result.error) {
        this._users[this._onEdit]=u;//atualizamos os dados para o cliente
        this.editMode(-1,true);
      }
      confirm(result.message);
    });

  }

  private editMode(edit : number, alterado : boolean = false ) {
    if(edit < 0 && !alterado) if(!confirm("Tem a certeza? todos os dados alterados serão perdidos")) return;
    this._onEdit=edit;
  }

  private get isEditing() {
    return this._onEdit != -1;
  }
  
  private deleteUser(index : number) : void {
    if(!confirm("Tem a certeza que pretende eliminar? Esta opção é permanente.")) return;
    this.users.deleteUser(this._users[index].id).subscribe((result) => {
      if(!result.error) {
        this._users.splice(index,1);
      }
      confirm(result.message);
    });
  }

  private searchUser(event) : void {
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
