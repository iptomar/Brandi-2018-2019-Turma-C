import { Component, OnInit } from '@angular/core';
import { DatasheetPage } from '../../datasheet-edit.component';
import { Datasheet } from 'src/app/services/datasheet/datasheet.service';
import { Global, ReceivedData } from 'src/app/Global';

@Component({
  selector: 'app-datasheet-page8',
  templateUrl: './datasheet-page8.component.html',
  styleUrls: ['./datasheet-page8.component.scss']
})

export class DatasheetPage8Component implements OnInit, DatasheetPage {
  _datasheet: Datasheet;
  _isEditing: boolean;

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

  constructor() {
    this._isEditing = false;
  }

  ngOnInit() {}
}
