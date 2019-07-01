import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DatasheetPage } from '../../datasheet-edit.component';
import { Datasheet } from 'src/app/services/datasheet/datasheet.service';
import { Observable } from 'rxjs';
import { Solvent, Solubility, TestsSolubilityService } from 'src/app/services/datasheet/tests-solubility.service';
import { UserNames, UsersService } from 'src/app/services/users/users.service';
import { take } from 'rxjs/operators';
import { ReceivedData } from 'src/app/Global';

@Component({
  selector: 'app-datasheet-page11',
  templateUrl: './datasheet-page11.component.html',
  styleUrls: ['./datasheet-page11.component.scss']
})
export class DatasheetPage11Component implements OnInit, DatasheetPage {
  @ViewChild("newSolubility") newSolubility:ElementRef;
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
  lastSearchSolubility:string;
  lastSearchSolvent:string;
  lastIdSolubility:number;
  /** Metodo que vai ser executado para cada child do create edit page 1, ... ,page 12*/
  getForm(event: any): Datasheet {
    return this._datasheet;
  }


  public addNewSolubTest(event){
    event.preventDefault();
    if(!confirm("Tema  certeza? depois de adicionado, este não pode ser alterado.")) return;
    let test_description = event.target.test_description.value;
    let test_features = event.target.test_features.value;
    let technician = event.target.technician.value;
    let test_date = new Date(event.target.test_date.value);
    this.messageEditSuccessSolubTest="";
    this.messageEditErrSolubTest="";
    this.testsSolubilityService.addSolubility(this._datasheet.id,test_description,test_features,technician,test_date).subscribe((res: ReceivedData) => {
      if(!res.error) {
        this.newSolubility.nativeElement.reset();
        this.updtTestsSolubility(this.lastSearchSolubility);
        this.messageEditSuccessSolubTest=res.message;
        setTimeout(function() {
          this.messageEditSuccessSolubTest="";
          this.messageEditErrSolubTest="";
        },3 * 1000);
      }else {
        this.messageEditErrSolubTest=res.message;
      }
    },take(1));
  }
  datasheet(datasheet: Datasheet): void {
    this._datasheet = datasheet;
    this.lastSearchSolubility="";
    this.updtTestsSolubility("");
  }

  isEditing(isEditing: boolean): void {
    this._isEditing = isEditing;
  }

  constructor(public users:UsersService, public testsSolubilityService: TestsSolubilityService) {
    this._isEditing = false;
    this._verTeste = false;
    this.messageEditSuccessSolubTest="";
    this.messageEditErrSolubTest="";
    this.messageEditErrSolvent="";
    this.messageEditSuccessSolvent="";
    this.lastSearchSolubility="";
    this.lastSearchSolvent="";
    this.lastIdSolubility=0;
  }
  public toggleSolventTestsAndSolubilityTests() {
    this._verTeste = !this._verTeste;
  }

  ngOnInit() {
    this._users$=this.users.getUsersNames("");
  }


  public updtTestsSolubility(search: string) {
    this.lastIdSolubility=0;
    this.lastSearchSolvent="";
    this._testsSolubility$=this.testsSolubilityService.getSolubilities(this._datasheet.id, search);
  }

  public updtTestsSolvent(idSolubility: number, search: string) {
  }

  public openSolventTab(idSolubility: number) {
    this.lastIdSolubility=idSolubility;
    this.updtTestsSolvent(idSolubility, "");
    this._verTeste=true;
  }

  public searchSolubility(event) {
    event.preventDefault();
    this.lastSearchSolubility=event.target.searchBox.value;
    this.updtTestsSolubility(this.lastSearchSolubility);
  }
  public searchSolvent(event) {
    event.preventDefault();
    this.lastSearchSolvent=event.target.searchBox.value;
    this.updtTestsSolvent(this.lastIdSolubility, this.lastSearchSolvent);
  }
}
