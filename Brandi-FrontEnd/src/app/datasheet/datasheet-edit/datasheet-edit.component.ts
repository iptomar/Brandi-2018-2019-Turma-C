import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { DatasheetService, Datasheet } from 'src/app/services/datasheet/datasheet.service';
import { DatasheetPage1Component } from './pages/datasheet-page1/datasheet-page1.component';
import { DatasheetPage2Component } from './pages/datasheet-page2/datasheet-page2.component';
import { DatasheetPage3Component } from './pages/datasheet-page3/datasheet-page3.component';
import { DatasheetPage4Component } from './pages/datasheet-page4/datasheet-page4.component';
import { DatasheetPage5Component } from './pages/datasheet-page5/datasheet-page5.component';
import { DatasheetPage6Component } from './pages/datasheet-page6/datasheet-page6.component';
import { DatasheetPage7Component } from './pages/datasheet-page7/datasheet-page7.component';
import { DatasheetPage8Component } from './pages/datasheet-page8/datasheet-page8.component';
import { DatasheetPage9Component } from './pages/datasheet-page9/datasheet-page9.component';
import { DatasheetPage10Component } from './pages/datasheet-page10/datasheet-page10.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscribable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

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
  selector: 'app-datasheet-edit',
  templateUrl: './datasheet-edit.component.html',
  styleUrls: ['./datasheet-edit.component.scss']
})
export class DatasheetEditComponent implements OnInit {
  @ViewChild(DatasheetPage1Component) datasheetPage1Component: DatasheetPage1Component;
  @ViewChild(DatasheetPage2Component) datasheetPage2Component: DatasheetPage2Component;
  @ViewChild(DatasheetPage3Component) datasheetPage3Component: DatasheetPage3Component;
  @ViewChild(DatasheetPage4Component) datasheetPage4Component: DatasheetPage4Component;
  @ViewChild(DatasheetPage5Component) datasheetPage5Component: DatasheetPage5Component;
  @ViewChild(DatasheetPage6Component) datasheetPage6Component: DatasheetPage6Component;
  @ViewChild(DatasheetPage7Component) datasheetPage7Component: DatasheetPage7Component;
  @ViewChild(DatasheetPage8Component) datasheetPage8Component: DatasheetPage8Component;
  @ViewChild(DatasheetPage9Component) datasheetPage9Component: DatasheetPage9Component;
  @ViewChild(DatasheetPage10Component) datasheetPage10Component: DatasheetPage10Component;
  @ViewChild("datasheetTabs") dataSheetTabs: ElementRef;
  

  private updateDatasheetInAllPages() {
    this.pages = [this.datasheetPage1Component, this.datasheetPage2Component,
      this.datasheetPage3Component, this.datasheetPage4Component, this.datasheetPage5Component,
      this.datasheetPage6Component, this.datasheetPage7Component, this.datasheetPage8Component,
      this.datasheetPage9Component, this.datasheetPage10Component];
    // so alterar acima
      for (let i = 0; i < this.pages.length; i++) {
        if (this.pages[i]) {
          this.pages[i].datasheet(this._datasheet);
          this.pages[i].isEditing(this.isEditing);
        }
    }
  }

  public _datasheet : Datasheet;
  private pages: DatasheetPage[] = [];
  // index do datasheet a ser modificado
  private _onEdit: boolean = false;
  // mensagem erro
  public messageEditErr: string;
  // mensagem sucesso
  public messageEditSuccess: string;
  constructor(private datasheetService: DatasheetService, private changeDetectorRef: ChangeDetectorRef, private router : Router ,private route: ActivatedRoute,) { 
    this.messageEditErr = "";
    this.messageEditSuccess = "";
  }

  ngOnInit() {
    this.datasheetService.getDatasheet(parseInt(this.route.snapshot.paramMap.get('id'),10)).subscribe((datasheet : Datasheet) => {
      this._datasheet=datasheet;
      this.updateDatasheetInAllPages();
    },
    take(1)
    );
  }
  
  public get isEditing() {
    // devolve true se puder ser editado
    return this._onEdit;
  }
  public setEditMode(editMode : boolean) : void {
    this._onEdit=editMode;
    this.getComponentOpen().datasheetpage.isEditing(editMode);
  }

  public reset() {
    this.setEditMode(false);
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
    this.datasheetService.submitDatasheets(datasheet, datasheetPageSearch.identification).subscribe((result) => {
      if (!result.error) {
        this.messageEditSuccess = result.message;
        this.setEditMode(false);
        // this._datasheetlist[this._onEdit]=u;//atualizamos os dados para o cliente
        setTimeout(() => {
          this.messageEditErr = "";
          this.messageEditSuccess = "";
          this._datasheet = datasheet;
        }, 3 * 1000); // espera 3 segundos antes de sair da pagina de edição
      } else { this.messageEditErr = result.message; }
    });
  }

  
  public changeTab(event) {
    event.preventDefault();
  }

  public cancelar() : void {
    this.router.navigate(["datasheet"]);
  }
}
