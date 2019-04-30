import { Component, OnInit } from '@angular/core';
import { DatasheetPage } from '../../datasheet.component';
import { Datasheet, DatasheetService } from 'src/app/services/datasheet/datasheet.service';

@Component({
  selector: 'app-datasheet-page2',
  templateUrl: './datasheet-page2.component.html',
  styleUrls: ['./datasheet-page2.component.scss']
})
export class DatasheetPage2Component implements OnInit,DatasheetPage {
  _datasheet: Datasheet;
  _isEditing: boolean;

  getForm(event: any): Datasheet {
    console.log("page2");
    return this._datasheet;
  }

  datasheet(datasheet: Datasheet): void {
    this._datasheet=datasheet;
  }
  isEditing(isEditing: boolean): void {
    this._isEditing=isEditing;
  }

  constructor() { 
    this._datasheet = DatasheetService.createCleanDatasheet();
    this._isEditing=false;
  }

  ngOnInit() {
  }

}
