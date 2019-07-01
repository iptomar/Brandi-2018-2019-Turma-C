import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DatasheetPage } from '../../datasheet-edit.component';
import { Datasheet } from 'src/app/services/datasheet/datasheet.service';
import { Observable } from 'rxjs';
import { Tests, TestsService } from 'src/app/services/datasheet/tests.service';
import { User } from 'src/app/services/auth/auth.service';
import { UsersService, UserNames } from 'src/app/services/users/users.service';
import { take } from 'rxjs/operators';
import { ReceivedData } from 'src/app/Global';

@Component({
  selector: 'app-datasheet-page5',
  templateUrl: './datasheet-page5.component.html',
  styleUrls: ['./datasheet-page5.component.scss']
})
export class DatasheetPage5Component implements OnInit, DatasheetPage {
  @ViewChild("newExame") newExame  :ElementRef;
  public _datasheet: Datasheet;
  public _isEditing: boolean;
  public _tests$:Observable<Tests[]>;
  public _users$:Observable<UserNames[]>;
  public _lastSearch:string;
  public messageEditErrTests :string;
  public messageEditSuccessTests:string;

  /**Metodo que vai ser executado para cada child do create edit page 1, ... ,page 10*/
  getForm(event: any): Datasheet {
    
    let datasheet: any = Object.assign({}, this._datasheet); // clona os dados
    datasheet.tests_Q1= (<HTMLInputElement>event.target.testsQ1).checked ? 1: 0;
    datasheet.tests_Q2= (<HTMLInputElement>event.target.testsQ2).checked ? 1: 0;
    datasheet.tests_Q3= (<HTMLInputElement>event.target.testsQ3).checked ? 1: 0;
    datasheet.tests_Q4= (<HTMLInputElement>event.target.testsQ4).checked ? 1: 0;
    datasheet.tests_Q5= (<HTMLInputElement>event.target.testsQ5).checked ? 1: 0;
    datasheet.tests_Q6= (<HTMLInputElement>event.target.testsQ6).checked ? 1: 0;
    datasheet.tests_results= event.target.testsResults.value;
    datasheet.tests_conclusions= event.target.testsConclusions.value;
    return datasheet;
  }

  datasheet(datasheet: Datasheet): void {
    this._datasheet = datasheet;
    this._lastSearch="";
    this.updtTests("");
  }
  isEditing(isEditing: boolean): void {
    this._isEditing = isEditing;
  }

  constructor(public testsService: TestsService, public userService: UsersService) {
    this._isEditing = false;
  }

  ngOnInit() {
    this._users$=this.userService.getUsersNames("");
    this.messageEditErrTests ="";
    this.messageEditSuccessTests ="";
    this._lastSearch="";
  }

  searchSource(event) {
    event.preventDefault();
    this._lastSearch=event.target.searchBox.value;
    this.updtTests(event.target.searchBox.value);
  }
  
  public updtTests(search : string) {
    this._tests$=this.testsService.getTests(this._datasheet.id,search);
  }


  public addNewExame(event) {
    event.preventDefault();
    if(!confirm("Tema  certeza? depois de adicionado, este não pode ser alterado.")) return;
    let type_reference : string = event.target.type_reference.value;
    let location : string = event.target.location.value;
    let objectives : string = event.target.objectives.value;
    let technician : number = event.target.technician.value;
    let results : string = event.target.results.value;
    this.messageEditErrTests="";
    this.messageEditSuccessTests="";
    this.testsService.addTest(this._datasheet.id, type_reference, location, objectives, technician, results).subscribe((data : ReceivedData) => {
      if(!data.error) {
        this.messageEditSuccessTests=data.message;
        this.updtTests(this._lastSearch);
        setTimeout(() => {
          this.newExame.nativeElement.reset();
          this.messageEditErrTests="";
          this.messageEditSuccessTests="";
        },3 *1000);
      }else {
        this.messageEditErrTests=data.message;
      }
    },take(1))
  }
}
