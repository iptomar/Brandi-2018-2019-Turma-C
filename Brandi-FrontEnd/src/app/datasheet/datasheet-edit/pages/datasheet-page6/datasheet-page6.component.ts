import { Component, OnInit } from '@angular/core';
import { DatasheetPage } from '../../datasheet-edit.component';
import {
  Datasheet
} from 'src/app/services/datasheet/datasheet.service';

@Component({
  selector: 'app-datasheet-page6',
  templateUrl: './datasheet-page6.component.html',
  styleUrls: ['./datasheet-page6.component.scss']
})
export class DatasheetPage6Component implements OnInit, DatasheetPage {
  _datasheet: Datasheet;
  _isEditing: boolean;

  /**Metodo que vai ser executado para cada child do create edit page 1, ... ,page 10*/
  getForm(event: any): Datasheet {

    let datasheet: any = Object.assign({}, this._datasheet); // clona os dados
    datasheet.surface_deterioration= event.target.surface_deterioration.value;
    datasheet.elements_deterioration= event.target.elements_deterioration.value;
    datasheet.support_diagnostic= event.target.support_diagnostic.value;
    datasheet.surface_diagnostic= event.target.surface_diagnostic.value;
    datasheet.elements_diagnostic= event.target.elements_diagnostic.value;
    datasheet.support_deterioration= event.target.support_deterioration.value;
    datasheet.conclusions_conservation= event.target.conclusions_conservation.value;


  
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

  ngOnInit() {}
}
