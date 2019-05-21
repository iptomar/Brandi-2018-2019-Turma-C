import { Component, OnInit } from '@angular/core';
import { DatasheetService, Datasheet, DatasheetList } from '../services/datasheet/datasheet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-datasheet',
  templateUrl: './datasheet.component.html',
  styleUrls: ['./datasheet.component.scss']
})

export class DatasheetComponent implements OnInit {

  // variaveis do componente
  // array com lista de datasheets
  public _datasheetlist: DatasheetList[];
  // string com o valor do campo de pesquisa
  private _searchWord: string;


  constructor(private datasheet: DatasheetService, private router: Router) {
     this._datasheetlist = [];
     this._searchWord = "";
  }


  public deleteDatasheet(): void {
    // delete(_onEdit);
  }

  // muda valor de _searchword e actualiza o array para o resultado da query
  public searchFichas(event): void {
    if (event != null) {
      event.preventDefault();
      if (event.target.searchBox.value === this._searchWord) return;
      this._searchWord = event.target.searchBox.value;
    }
    this.datasheet.getDatasheets(this._searchWord).subscribe((fichas) => {
      this._datasheetlist = fichas;
    });
  }


  // muda o valor de _onEdit
  public openFicha(edit: number) {
    this.router.navigate(["datasheet/edit/",edit])
  }

  ngOnInit() {
    this.searchFichas(null);
  }

}
