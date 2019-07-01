import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DatasheetPage } from '../../datasheet-edit.component';
import { Datasheet } from 'src/app/services/datasheet/datasheet.service';
import { Observable } from 'rxjs';
import { Worksheet, WorksheetService } from 'src/app/services/datasheet/worksheet.service';
import { ReceivedData } from 'src/app/Global';
import { take } from 'rxjs/operators';
import { UsersService, UserNames } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-datasheet-page12',
  templateUrl: './datasheet-page12.component.html',
  styleUrls: ['./datasheet-page12.component.scss']
})
export class DatasheetPage12Component implements OnInit, DatasheetPage {
  @ViewChild("newProcedure")newProcedure : ElementRef;
  _datasheet: Datasheet;
  _isEditing: boolean;
  _worksheets$: Observable<Worksheet[]>;
  public _users$: Observable<UserNames[]>;
  lastSearch:string;
  messageEditSuccessWorksheet:string;
  messageEditErrWorksheet:string;

  /** Metodo que vai ser executado para cada child do create edit page 1, ... ,page 12*/
  getForm(event: any): Datasheet {
    return this._datasheet;
  }

  datasheet(datasheet: Datasheet): void {
    this._datasheet = datasheet;
    this.lastSearch="";
    this.updWorksheets("");
  }

  isEditing(isEditing: boolean): void {
    this._isEditing = isEditing;
  }

  constructor(public worksheetService : WorksheetService, public users:UsersService) {
    this._isEditing = false;
    this.messageEditSuccessWorksheet="";
    this.messageEditErrWorksheet="";
  }

  public addNewProcedure(event) {
    event.preventDefault();
    if(!confirm("Tema  certeza? depois de adicionado, este não pode ser alterado.")) return;
    let procedure_date = new Date(event.target.procedure_date.value);
    let procedure_designation = event.target.procedure_designation.value;
    let procedure_materials = event.target.procedure_materials.value;
    let procedure_amount = event.target.procedure_amount.value;
    let procedure_duration = event.target.procedure_duration.value;
    let procedure_technician = event.target.procedure_technician.value;
    let procedure_observations = event.target.procedure_observations.value;
    this.messageEditSuccessWorksheet="";
    this.messageEditErrWorksheet="";
    this.worksheetService.addWorksheet(this._datasheet.id,procedure_date, procedure_designation, procedure_observations, procedure_materials, procedure_amount, procedure_duration, procedure_technician).subscribe((res: ReceivedData) => {
      if(!res.error) {
        this.newProcedure.nativeElement.reset();
        this.updWorksheets(this.lastSearch);
        this.messageEditSuccessWorksheet=res.message;
        setTimeout(function() {
          this.messageEditSuccessWorksheet="";
          this.messageEditErrWorksheet="";
        },3 * 1000);
      }else {
        this.messageEditErrWorksheet=res.message;
      }
    },take(1));
  }

  public searchWorksheet(event) {
    event.preventDefault();
    this.lastSearch=event.target.searchBox.value;
    this.updWorksheets(this.lastSearch);
  }
  public updWorksheets(search : string) {
    this._worksheets$=this.worksheetService.getWorksheets(this._datasheet.id,search);
  }
  ngOnInit() {
    this._users$=this.users.getUsersTechnitiansNames("");
  }
}
