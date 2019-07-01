import { Component, OnInit } from '@angular/core';
import { DatasheetPage } from '../../datasheet-edit.component';
import { Datasheet } from 'src/app/services/datasheet/datasheet.service';
import { Observable } from 'rxjs';
import { Solvent, Solubility } from 'src/app/services/datasheet/tests-solubility.service';
import { UserNames, UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-datasheet-page11',
  templateUrl: './datasheet-page11.component.html',
  styleUrls: ['./datasheet-page11.component.scss']
})
export class DatasheetPage11Component implements OnInit, DatasheetPage {
  _datasheet: Datasheet;
  _isEditing: boolean;
  _verTeste: boolean;
  _testsSolvent$:Observable<Solvent[]>;
  _testsSolubility$:Observable<Solubility[]>;
  public _users$: Observable<UserNames[]>;
  messageEditSuccessSolubTest :string;
  messageEditErrSolubTest:string;
   messageEditErrSolvent:string;
    messageEditSuccessSolvent:string;
  /** Metodo que vai ser executado para cada child do create edit page 1, ... ,page 12*/
  getForm(event: any): Datasheet {
    return this._datasheet;
  }

  datasheet(datasheet: Datasheet): void {
    this._datasheet = datasheet;
  }

  isEditing(isEditing: boolean): void {
    this._isEditing = isEditing;
  }

  constructor(public users:UsersService) {
    this._isEditing = false;
    this._verTeste = false;
    this.messageEditSuccessSolubTest="";
    this.messageEditErrSolubTest="";
    this.messageEditErrSolvent="";
    this.messageEditSuccessSolvent="";
  }
  public toggleSolventTestsAndSolubilityTests() {
    this._verTeste = !this._verTeste;
  }

  ngOnInit() {
    this._users$=this.users.getUsersNames("");
  }


  public updtTestsSolubility(search: string) {

  }

  public updtTestsSolvent(idSolubility: number, search: string) {
    
  }
}
