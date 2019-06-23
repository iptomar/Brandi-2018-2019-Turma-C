import { Component, OnInit } from '@angular/core';
import { DatasheetPage } from '../../datasheet-edit.component';
import { Datasheet } from 'src/app/services/datasheet/datasheet.service';

@Component({
  selector: 'app-datasheet-page11',
  templateUrl: './datasheet-page11.component.html',
  styleUrls: ['./datasheet-page11.component.scss']
})
export class DatasheetPage11Component implements OnInit, DatasheetPage {
  _datasheet: Datasheet;
  _isEditing: boolean;
  _verTeste: boolean;

  /** Metodo que vai ser executado para cada child do create edit page 1, ... ,page 12*/
  getForm(event: any): Datasheet {
    console.log('page11');
    return this._datasheet;
  }

  datasheet(datasheet: Datasheet): void {
    this._datasheet = datasheet;
  }

  isEditing(isEditing: boolean): void {
    this._isEditing = isEditing;
  }

  constructor() {
    this._isEditing = false;
    this._verTeste = false;
  }
  public cenas() {
    this._verTeste = !this._verTeste;
  }

  ngOnInit() {
  }

}