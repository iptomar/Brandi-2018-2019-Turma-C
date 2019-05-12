import { Component, OnInit } from '@angular/core';
import { DatasheetPage } from '../../datasheet.component';
import { Datasheet, DatasheetService } from 'src/app/services/datasheet/datasheet.service';

@Component({
  selector: 'app-datasheet-page5',
  templateUrl: './datasheet-page5.component.html',
  styleUrls: ['./datasheet-page5.component.scss']
})
export class DatasheetPage5Component implements OnInit, DatasheetPage {
  _datasheet: Datasheet;
  _isEditing: boolean;

  getForm(event: any): Datasheet {
    console.log('page3');
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
