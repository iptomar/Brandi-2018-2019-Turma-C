import { Component, OnInit } from '@angular/core';

import { Datasheet } from 'src/app/services/datasheet/datasheet.service';
import { DatasheetPage } from '../../datasheet-edit.component';

@Component({
  selector: 'app-datasheet-page4',
  templateUrl: './datasheet-page4.component.html',
  styleUrls: ['./datasheet-page4.component.scss']
})
export class DatasheetPage4Component implements OnInit, DatasheetPage {
  _datasheet: any;
  _isEditing: boolean;

  /**Metodo que vai ser executado para cada child do create edit page 1, ... ,page 10*/
  getForm(event: any): any {

    let datasheet: any = Object.assign({}, this._datasheet); // clona os dados
  datasheet.site_description= event.target.site_description.value;
  datasheet.cold_temp= event.target.cold_temp.value;
  datasheet.hot_temp= event.target.hot_temp.value;
  datasheet.cold_humidity= event.target.cold_humidity.value;
  datasheet.hot_humidity= event.target.hot_humidity.value;
  datasheet.cold_start= event.target.cold_start.value;
  datasheet.cold_end= event.target.cold_end.value;
  datasheet.hot_start= event.target.hot_start.value;
  datasheet.hot_end= event.target.hot_end.value;
  datasheet.lightning_type_natural= event.target.lightning_type_natural.value;
  datasheet.lightning_origin_artificial= event.target.lightning_origin_artificial.value;
  datasheet.artificial_lux= event.target.artificial_lux.value;
  datasheet.natural_lux= event.target.natural_lux.value;
  datasheet.artificial_uv= event.target.artificial_uv.value;
  datasheet.natural_uv= event.target.natural_uv.value;
  datasheet.artificial_real_uv= event.target.artificial_real_uv.value;
  datasheet.natural_real_uv= event.target.natural_real_uv.value;
  datasheet.poluting_agents= event.target.poluting_agents.value;
  datasheet.poluting_sources= event.target.poluting_sources.value;
  datasheet.poluting_results= event.target.poluting_results.value;
  datasheet.env_conclusions= event.target.env_conclusions.value;
  
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
