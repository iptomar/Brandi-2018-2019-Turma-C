import { Component, OnInit } from '@angular/core';
import { Datasheet, DatasheetService } from 'src/app/services/datasheet/datasheet.service';
import { Type } from '@angular/compiler';
import { Global } from 'src/app/Global';
import { DatasheetPage } from '../../datasheet.component';
import { User } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-datasheet-page1',
  templateUrl: './datasheet-page1.component.html',
  styleUrls: ['./datasheet-page1.component.scss']
})
export class DatasheetPage1Component implements OnInit, DatasheetPage {
  public _datasheet: Datasheet;
  public _isEditing: boolean;
  public _users: User[];
  constructor(public users: UsersService) {
    this._datasheet = DatasheetService.createCleanDatasheet();
    this._isEditing = false;
    this._users = [];
    this.users.getUsers("").subscribe((users_list) => {
      this._users = users_list;
    });
  }

  datasheet(datasheet: Datasheet): void {
    this._datasheet = datasheet;
  }
  isEditing(isEditing: boolean): void {
    this._isEditing = isEditing;
  }

  public getForm(event: any): Datasheet {
    let datasheet: Datasheet = Object.assign({}, this._datasheet); // clona os dados
    datasheet.object_designation = event.target.design.value;
    datasheet.CEARC_process = event.target.CEARC.value;
    datasheet.CEARC_process_date = Global.stringToDate(event.target.CEARCdate.value);
    datasheet.CEARC_entry_date = Global.stringToDate(event.target.CEARCentrydate.value);
    datasheet.LCRM_process = event.target.LCRM.value;
    datasheet.LCRM_process_date = Global.stringToDate(event.target.LCRMdate.value);
    datasheet.LCRM_entry_date = Global.stringToDate(event.target.LCRMentrydate.value);
    datasheet.coordinator = event.target.coordinator.value;
    datasheet.coordinator_name = event.target.coordinator.value;
    return datasheet;
  }

  ngOnInit() {
  }

}
