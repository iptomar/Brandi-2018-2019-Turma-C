import { Component, OnInit } from '@angular/core';
import { DatasheetPage } from '../../datasheet.component';
import { Datasheet, DatasheetService } from 'src/app/services/datasheet/datasheet.service';

@Component({
  selector: 'app-datasheet-page10',
  templateUrl: './datasheet-page10.component.html',
  styleUrls: ['./datasheet-page10.component.scss']
})

export class DatasheetPage10Component implements OnInit, DatasheetPage {
  _datasheet: Datasheet;
  _isEditing: boolean;

  getForm(event: any): Datasheet {
    console.log('page10');
    return this._datasheet;
  }

  datasheet(datasheet: Datasheet): void {
    this._datasheet = datasheet;
  }

  isEditing(isEditing: boolean): void {
    this._isEditing = isEditing;
  }

  constructor() {
    this._datasheet = DatasheetService.createCleanDatasheet();
    this._isEditing = false;
  }

  ngOnInit() {
  }

}
