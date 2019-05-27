import { Component, OnInit } from '@angular/core';
import { DatasheetPage } from '../../datasheet-edit.component';
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


  datasheet(datasheet: Datasheet): void {
    this._datasheet=datasheet;
  }
  isEditing(isEditing: boolean): void {
    this._isEditing=isEditing;
  }
  public getForm(event: any): any {
    let datasheet: any = Object.assign({}, this._datasheet); // clona os dados
    datasheet.dimensions= event.target.dimensions.value;
    datasheet.other_dimensions= event.target.other_dimensions.value;
    datasheet.tipology= event.target.tipology.value;
    datasheet.site= event.target.site.value;
    datasheet.object_owner= event.target.object_owner.value;
    datasheet.owner= event.target.owner.value;
    datasheet.patron= event.target.patron.value;
    
    return datasheet;
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
  constructor(public contactS :ContactsService) { 
    this._isEditing=false;
    this._searchWord = "";
    this._contacts=[];
  }

  ngOnInit() {
  }

}
