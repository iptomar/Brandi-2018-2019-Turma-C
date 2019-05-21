import { Component, OnInit } from '@angular/core';
import { DatasheetPage } from '../../datasheet-edit.component';
import {
  Datasheet,
  DatasheetService
} from 'src/app/services/datasheet/datasheet.service';

@Component({
  selector: 'app-datasheet-page7',
  templateUrl: './datasheet-page7.component.html',
  styleUrls: ['./datasheet-page7.component.scss']
})
export class DatasheetPage7Component implements OnInit, DatasheetPage {
  _datasheet: Datasheet;
  _isEditing: boolean;

  getForm(event: any): Datasheet {
    console.log('page7');
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
  }

  ngOnInit() {}
}
