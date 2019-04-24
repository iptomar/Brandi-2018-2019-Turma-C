import { Component, OnInit } from '@angular/core';
import { DatasheetService } from '../services/datasheet/datasheet.service';
import { ReceivedData } from '../Global';

@Component({
  selector: 'app-datasheet',
  templateUrl: './datasheet.component.html',
  styleUrls: ['./datasheet.component.scss']
})

export class DatasheetComponent implements OnInit {
  public _datasheetlist : any;
  private _searchWord : string;
  private _onEdit : number = -1;
  private _onShow : boolean;
  public messageEditErr : string;
  public messageEditSuccess : string;

  constructor(private datasheet : DatasheetService) { 
     this._datasheetlist=[];
     this.messageEditErr ="";
     this.messageEditSuccess ="";
     this._searchWord="";
     this._onShow=false;
  }

  public get isEditing() {
    return this._onEdit != -1 && !this._onShow;
  }

  public get isShowing() {
    return this._onEdit != -1;
  }

  public searchFichas(event) : void {
    if(event != null) {
      event.preventDefault();
      if(event.target.searchBox.value === this._searchWord) return;
      this._searchWord = event.target.searchBox.value;
    }
    this.datasheet.getDatasheets(this._searchWord).subscribe((fichas) => {
      this._datasheetlist=fichas;
    });
  }

  public saveDatasheet(event) {

  }

  public openFicha(edit : number) {
    this._onEdit=edit;
    if(edit > -1)this._onShow=true;
    else this._onShow=false;
  }

  public setShowMode(showMode : boolean) {
    this._onShow=showMode;
  }


  ngOnInit() {
    this.searchFichas(null);
  }

}
