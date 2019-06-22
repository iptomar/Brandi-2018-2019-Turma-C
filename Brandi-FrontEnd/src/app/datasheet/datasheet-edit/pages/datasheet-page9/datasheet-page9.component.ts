import { Component, OnInit } from '@angular/core';
import { DatasheetPage } from '../../datasheet-edit.component';
import { Datasheet } from 'src/app/services/datasheet/datasheet.service';

@Component({
  selector: 'app-datasheet-page9',
  templateUrl: './datasheet-page9.component.html',
  styleUrls: ['./datasheet-page9.component.scss']
})

export class DatasheetPage9Component implements OnInit, DatasheetPage {
  _datasheet: Datasheet;
  _isEditing: boolean;

  /**Metodo que vai ser executado para cada child do create edit page 1, ... ,page 10*/
  getForm(event: any): Datasheet {
  
    let datasheet: any = Object.assign({}, this._datasheet); // clona os dados
    datasheet.support_intervention= event.target.support_intervention.value;
    datasheet.support_resources_intervention= event.target.support_resources_intervention.value;
    datasheet.surface_intervention= event.target.surface_intervention.value;
    datasheet.surface_resources_intervention= event.target.surface_resources_intervention.value;
    datasheet.elements_intervention= event.target.elements_intervention.value;
    datasheet.elements_resources_intervention= event.target.elements_resources_intervention.value;
    datasheet.observations_intervention= event.target.observations_intervention.value;
  
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

  ngOnInit() {
  }

}
