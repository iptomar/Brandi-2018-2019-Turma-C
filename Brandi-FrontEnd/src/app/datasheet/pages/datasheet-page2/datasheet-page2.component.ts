import { Component, OnInit } from '@angular/core';
import { DatasheetPage } from '../../datasheet.component';
import { Datasheet, DatasheetService } from 'src/app/services/datasheet/datasheet.service';
import { ContactsService, Contacto } from 'src/app/services/datasheet/contacts.service';

@Component({
  selector: 'app-datasheet-page2',
  templateUrl: './datasheet-page2.component.html',
  styleUrls: ['./datasheet-page2.component.scss']
})
export class DatasheetPage2Component implements OnInit,DatasheetPage {
  _datasheet: Datasheet;
  _isEditing: boolean;
  _searchWord: string;
  _contacts: Contacto[];

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
  public searchContact(event) : void {
    if(event != null) {
      event.preventDefault();
      if(event.target.searchBox.value === this._searchWord) return;
      this._searchWord = event.target.searchBox.value;
    }
    this.contactS.getContacts(this._searchWord).subscribe((contact_list) => {
      this._contacts=contact_list;
    });
  }
  constructor(private contactS :ContactsService) { 
    this._datasheet = DatasheetService.createCleanDatasheet();
    this._isEditing=false;
    this._searchWord = "";
    this._contacts=[];
  }

  ngOnInit() {
  }

}
