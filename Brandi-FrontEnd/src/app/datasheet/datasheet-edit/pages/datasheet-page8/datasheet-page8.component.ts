import { Component, OnInit } from '@angular/core';
import { DatasheetPage } from '../../datasheet-edit.component';
import { Datasheet, DatasheetService } from 'src/app/services/datasheet/datasheet.service';

@Component({
  selector: 'app-datasheet-page8',
  templateUrl: './datasheet-page8.component.html',
  styleUrls: ['./datasheet-page8.component.scss']
})

export class DatasheetPage8Component implements OnInit, DatasheetPage {
  _datasheet: Datasheet;
  _isEditing: boolean;

  getForm(event: any): Datasheet {
    console.log('page8');
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
