import { Component, OnInit } from '@angular/core';
import { DatasheetPage } from '../../datasheet-edit.component';
import {
  Datasheet
} from 'src/app/services/datasheet/datasheet.service';

@Component({
  selector: 'app-datasheet-page7',
  templateUrl: './datasheet-page7.component.html',
  styleUrls: ['./datasheet-page7.component.scss']
})
export class DatasheetPage7Component implements OnInit, DatasheetPage {
  _datasheet: Datasheet;
  _isEditing: boolean;

  /**Metodo que vai ser executado para cada child do create edit page 1, ... ,page 10*/
  getForm(event: any): Datasheet {
    let datasheet: any = Object.assign({}, this._datasheet); // clona os dados
    datasheet.support= event.target.support.value;
    datasheet.surface= event.target.surface.value;
    datasheet.elements= event.target.elements.value;
    datasheet.conclusions_previous_interventions= event.target.conclusions_previous_interventions.value;
    

  
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
