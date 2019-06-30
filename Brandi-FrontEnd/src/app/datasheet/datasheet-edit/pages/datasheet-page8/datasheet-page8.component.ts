import { Component, OnInit } from '@angular/core';
import { DatasheetPage } from '../../datasheet-edit.component';
import { Datasheet } from 'src/app/services/datasheet/datasheet.service';
import { Global, ReceivedData } from 'src/app/Global';
import { take } from 'rxjs/operators';
import { Contact, ContactsService } from 'src/app/services/datasheet/contacts.service';
import { UserNames, UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-datasheet-page8',
  templateUrl: './datasheet-page8.component.html',
  styleUrls: ['./datasheet-page8.component.scss']
})

export class DatasheetPage8Component implements OnInit, DatasheetPage {
  _datasheet: Datasheet;
  _isEditing: boolean;
  _contacts: Contact[];
  public _users: UserNames[];
  
  messageEditErrContact:string;
  messageEditSuccessContact:string;
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

  /**Metodo que vai ser executado para cada child do create edit page 1, ... ,page 10*/
  getForm(event: any): Datasheet {    
    let datasheet: any = Object.assign({}, this._datasheet); // clona os dados
    datasheet.owner_preserve= (<HTMLInputElement>event.target.owner_preserve).checked ? 1: 0;
    datasheet.owner_conserve= (<HTMLInputElement>event.target.owner_conserve).checked ? 1: 0;
    datasheet.owner_restaure= (<HTMLInputElement>event.target.owner_restaure).checked ? 1: 0;
    datasheet.specific_aspects= event.target.specific_aspects.value;
    datasheet.prop_preserve = (<HTMLInputElement>event.target.prop_preserve).checked ? 1: 0;
    datasheet.prop_conserve = (<HTMLInputElement>event.target.prop_conserve).checked ? 1: 0
    datasheet.prop_restaure = (<HTMLInputElement>event.target.prop_conserve).checked ? 1: 0
    datasheet.support_proposal= event.target.support_proposal.value;
    datasheet.support_resources= event.target.support_resources.value;
    datasheet.surface_proposal= event.target.surface_proposal.value;
    datasheet.surface_resources= event.target.surface_resources.value;
    datasheet.elements_proposal= event.target.elements_proposal.value;
    datasheet.elements_resources= event.target.elements_resources.value;
    datasheet.observations= event.target.observations.value;
    datasheet.proposal_date= Global.stringToDate(event.target.proposal_date.value);
    datasheet.acceptation_date= Global.stringToDate(event.target.acceptation_date.value);
    
    return datasheet;
  }

  datasheet(datasheet: Datasheet): void {
    this._datasheet = datasheet;
  }

  isEditing(isEditing: boolean): void {
    this._isEditing = isEditing;
  }

  constructor(public contactsService :ContactsService,public users: UsersService) {
    this._isEditing = false;
    this.messageEditErrContact="";
    this.messageEditSuccessContact="";
  }

  ngOnInit() {

    this.users.getUsersNames("").subscribe((users_list) => {
      this._users = users_list;
    },take(1));
    this.contactsService.getContacts("").subscribe((contacts: Contact[]) => {
      this._contacts=contacts;
    },take(1));
  }
}
