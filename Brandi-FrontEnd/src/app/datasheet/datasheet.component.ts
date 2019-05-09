import { Component, OnInit, ViewChild, OnChanges, DoCheck, AfterViewChecked, AfterViewInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { DatasheetService, Datasheet } from '../services/datasheet/datasheet.service';
import { ReceivedData, Global } from '../Global';
import { DatasheetPage1Component } from './pages/datasheet-page1/datasheet-page1.component';
import { DatasheetPage2Component } from './pages/datasheet-page2/datasheet-page2.component';
import { DatasheetPage3Component } from './pages/datasheet-page3/datasheet-page3.component';
import { DatasheetPage4Component } from './pages/datasheet-page4/datasheet-page4.component';

export interface DatasheetPage {
  getForm(event: any): Datasheet;
  _datasheet: Datasheet;
  _isEditing: boolean;
  datasheet(datasheet: Datasheet): void;
  isEditing(isEditing: boolean): void;
}

export interface DatasheetPageSearch {
  datasheetpage: DatasheetPage;
   identification: number;
}



@Component({
  selector: 'app-datasheet',
  templateUrl: './datasheet.component.html',
  styleUrls: ['./datasheet.component.scss']
})

export class DatasheetComponent implements OnInit {
  @ViewChild(DatasheetPage1Component) datasheetPage1Component: DatasheetPage1Component;
  @ViewChild(DatasheetPage2Component) datasheetPage2Component: DatasheetPage2Component;
  @ViewChild(DatasheetPage3Component) datasheetPage3Component: DatasheetPage3Component;
  @ViewChild(DatasheetPage4Component) datasheetPage4Component: DatasheetPage4Component;
  @ViewChild("datasheetTabs") dataSheetTabs: ElementRef;

  private pages: DatasheetPage[] = [];

  private updateDatasheetInAllPages() {
    this.pages = [this.datasheetPage1Component, this.datasheetPage2Component, this.datasheetPage3Component, this.datasheetPage4Component];
    // so alterar acima
    if (this._onEdit > -1) {
      for (let i = 0; i < this.pages.length; i++) {
        if (this.pages[i]) {
          this.pages[i].datasheet(this._datasheetlist[this._onEdit]);
          this.pages[i].isEditing(this.isEditing);
        }
      }
    }
  }

  // variaveis do componente
  // array com lista de datasheets
  public _datasheetlist: Datasheet[];
  // string com o valor do campo de pesquisa
  private _searchWord: string;
  // index do datasheet a ser modificado
  private _onEdit: number = -1;
  // boolean se esta em modo de edição ou não
  private _onShow: boolean;
  // mensagem erro
  public messageEditErr: string;
  // mensagem sucesso
  public messageEditSuccess: string;


  constructor(private datasheet: DatasheetService, private changeDetectorRef: ChangeDetectorRef) {
     this._datasheetlist = [];
     this.messageEditErr = "";
     this.messageEditSuccess = "";
     this._searchWord = "";
     this._onShow = false;
  }

  public get isEditing() {
    // devolve true se puder ser editado
    return this._onEdit != -1 && !this._onShow;
  }

  public get isShowing() {
    // devolve true se não estiver em modo de listagem do array
    return this._onEdit != -1;
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

  private getComponentOpen(): DatasheetPageSearch {
    let identification = parseInt(this.dataSheetTabs.nativeElement.querySelector('[aria-selected="true"]').getAttribute("data-id"), 10);
    return {datasheetpage: this.pages[identification], identification: identification};
  }

  // envia dados dos inputs para a api
  public saveDatasheet(event: any): void {
    event.preventDefault();
    let datasheetPageSearch: DatasheetPageSearch = this.getComponentOpen();
    let datasheet: Datasheet = datasheetPageSearch.datasheetpage.getForm(event);
    this.datasheet.submitDatasheets(datasheet, datasheetPageSearch.identification).subscribe((result) => {
      if (!result.error) {
        this.messageEditSuccess = result.message;
        // this._datasheetlist[this._onEdit]=u;//atualizamos os dados para o cliente
        setTimeout(() => {
          this.messageEditErr = "";
          this.messageEditSuccess = "";
          this._datasheetlist[this._onEdit] = datasheet;
          this._onEdit = -1;
        }, 3 * 1000); // espera 3 segundos antes de sair da pagina de edição
      } else { this.messageEditErr = result.message; }
    });
  }

  // muda o valor de _onEdit
  public openFicha(edit: number) {
    this._onEdit = edit;
    if (edit > -1) {
      this._onShow = true;
    } else {
      this._onShow = false;
    }
  }
  // muda o valor de _onShow
  public setShowMode(showMode: boolean) {
    this._onShow = showMode;
  }

  public changeTab(event) {
    event.preventDefault();
  }

  ngOnInit() {
    this.searchFichas(null);
  }

  ngAfterViewChecked(): void {
    this.updateDatasheetInAllPages();

    // sempre no final
    this.changeDetectorRef.detectChanges();
  }
}
