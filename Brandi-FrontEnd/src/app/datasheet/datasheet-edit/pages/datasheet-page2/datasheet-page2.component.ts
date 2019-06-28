import { Component, OnInit } from '@angular/core';
import { DatasheetPage } from '../../datasheet-edit.component';
import { Datasheet, DatasheetService } from 'src/app/services/datasheet/datasheet.service';
import { ContactsService, Contact } from 'src/app/services/datasheet/contacts.service';
import { Observable  } from 'rxjs';
import { take  } from 'rxjs/operators';
import { ReceivedData } from 'src/app/Global';

@Component({
  selector: 'app-datasheet-page2',
  templateUrl: './datasheet-page2.component.html',
  styleUrls: ['./datasheet-page2.component.scss']
})
export class DatasheetPage2Component implements OnInit,DatasheetPage {
  _datasheet: Datasheet;
  _isEditing: boolean;
  _contacts: Contact[];
  messageEditErrContact:string;
  messageEditSuccessContact:string;


  datasheet(datasheet: Datasheet): void {
    this._datasheet=datasheet;
  }
  isEditing(isEditing: boolean): void {
    this._isEditing=isEditing;
  }
  /**Metodo que vai ser executado para cada child do create edit page 1, ... ,page 10*/
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

  constructor(public contactsService :ContactsService) { 
    this._isEditing=false;
    this.messageEditErrContact="";
    this.messageEditSuccessContact="";
  }


  public addNewContact(event) : void {
    event.preventDefault();                  
    
    this.messageEditErrContact="";
    this.messageEditSuccessContact="";
    let contact_name = event.target.contact_name.value;
    let contact_email = event.target.contact_email.value;
    let contact_address = event.target.contact_address.value;
    let contact_phone = event.target.contact_phone.value;
    this.contactsService.createContact(
      contact_name,
        contact_email,
        contact_address,
        contact_phone
      ).subscribe((res : ReceivedData) => {
        if(!res.error) {
          this._contacts.push(<Contact>{id:res.res.id,full_name: contact_name, email: contact_email,phone:contact_phone, address: contact_address});
          this.messageEditSuccessContact=res.message;
          event.target.contact_name.value="";
          event.target.contact_email.value="";
          event.target.contact_address.value="";
          event.target.contact_phone.value="";
          setTimeout(function() {
            this.messageEditErrContact="";
            this.messageEditSuccessContact="";
          },3 * 1000);
        }else {
          this.messageEditErrContact=res.message;
        }
      },take(1));
  }

  ngOnInit() {
    this.contactsService.getContacts("").subscribe((contacts: Contact[]) => {
      this._contacts=contacts;
    },take(1));
  }

}
