import { Component, OnInit } from '@angular/core';
import { DatasheetPage } from '../../datasheet.component';
import { Datasheet, DatasheetService } from 'src/app/services/datasheet/datasheet.service';

@Component({
  selector: 'app-datasheet-page9',
  templateUrl: './datasheet-page9.component.html',
  styleUrls: ['./datasheet-page9.component.scss']
})

export class DatasheetPage9Component implements OnInit, DatasheetPage {
  _datasheet: Datasheet;
  _isEditing: boolean;

  getForm(event: any): Datasheet {
    console.log('page9');
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
