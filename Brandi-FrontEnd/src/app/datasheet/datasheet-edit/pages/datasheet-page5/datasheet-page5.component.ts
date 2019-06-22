import { Component, OnInit } from '@angular/core';
import { DatasheetPage } from '../../datasheet-edit.component';
import { Datasheet } from 'src/app/services/datasheet/datasheet.service';

@Component({
  selector: 'app-datasheet-page5',
  templateUrl: './datasheet-page5.component.html',
  styleUrls: ['./datasheet-page5.component.scss']
})
export class DatasheetPage5Component implements OnInit, DatasheetPage {
  public _datasheet: Datasheet;
  public _isEditing: boolean;

  /**Metodo que vai ser executado para cada child do create edit page 1, ... ,page 10*/
  getForm(event: any): Datasheet {
    
    let datasheet: any = Object.assign({}, this._datasheet); // clona os dados
    /*datasheet.testsQ1= event.target.testsQ1.value;
    datasheet.testsQ2= event.target.testsQ2.value;
    datasheet.testsQ3= event.target.testsQ3.value;
    datasheet.testsQ4= event.target.testsQ4.value;
    datasheet.testsQ5= event.target.testsQ5.value;
    datasheet.testsQ6= event.target.testsQ6.value;    
    datasheet.array= event.target.array.value; // ver
    datasheet.testsResults= event.target.testsResults.value;
    datasheet.testsConclusions= event.target.testsConclusions.value;

  */
  return datasheet;
  }

  datasheet(datasheet: Datasheet): void {
    this._datasheet = datasheet;
  }
  isEditing(isEditing: boolean): void {
    this._isEditing = isEditing;
  }

  constructor() {
    this._isEditing = false;
  }

  ngOnInit() {
  }

}
