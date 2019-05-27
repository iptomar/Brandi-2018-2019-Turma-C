import { Component, OnInit } from '@angular/core';
import { DatasheetPage } from '../../datasheet-edit.component';
import { Datasheet, DatasheetService } from 'src/app/services/datasheet/datasheet.service';

@Component({
  selector: 'app-datasheet-page3',
  templateUrl: './datasheet-page3.component.html',
  styleUrls: ['./datasheet-page3.component.scss']
})
export class DatasheetPage3Component implements OnInit, DatasheetPage {
  _datasheet: Datasheet;
  _isEditing: boolean;

 /**Metodo que vai ser executado para cada child do create edit page 1, ... ,page 10*/
  public getForm(event: any): any {
    let datasheet: any = Object.assign({}, this._datasheet); // clona os dados
    datasheet.object_is_a_set= event.target.object_is_a_set.value;
    datasheet.set_type= event.target.set_type.value;
    datasheet.set_elements= event.target.set_elements.value;
    datasheet.set_materials= event.target.set_materials.value;
    datasheet.set_inscriptions= event.target.set_inscriptions.value;
    datasheet.set_mount= event.target.set_mount.value;
    datasheet.set_build= event.target.set_build.value;
    datasheet.classification= event.target.classification.value;
    datasheet.period= event.target.period.value;
    datasheet.quality= event.target.quality.value;
    datasheet.style= event.target.style.value;
    datasheet.small_description= event.target.small_description.value;// ?
    datasheet.analogies= event.target.analogies.value;
    datasheet.conclusions= event.target.conclusions.value;
    datasheet.author= event.target.author.value;
    datasheet.dating= event.target.dating.value;
    datasheet.origin= event.target.origin.value;
    datasheet.materials_structure= event.target.materials_structure.value;
    datasheet.materials_surface= event.target.materials_surface.value;
    datasheet.materials_elementsAccessories= event.target.materials_elementsAccessories.value;
    datasheet.techniques_structure= event.target.techniques_structure.value;
    datasheet.techniques_surface= event.target.techniques_surface.value;
    datasheet.techniques_elementsAccessories= event.target.techniques_elementsAccessories.value;

    
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
