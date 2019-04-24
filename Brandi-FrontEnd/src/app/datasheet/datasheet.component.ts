import { Component, OnInit } from '@angular/core';
import { DatasheetService, DatasheetEdit } from '../services/datasheet/datasheet.service';
import { ReceivedData } from '../Global';

@Component({
  selector: 'app-datasheet',
  templateUrl: './datasheet.component.html',
  styleUrls: ['./datasheet.component.scss']
})

export class DatasheetComponent implements OnInit {
  //variaveis do componente
  //array com lista de datasheets
  public _datasheetlist : any;
  //string com o valor do campo de pesquisa
  private _searchWord : string;
  //index do datasheet a ser modificado
  private _onEdit : number = -1;
  //boolean se esta em modo de edição ou não
  private _onShow : boolean;
  //pagina a mostrar
  public _pagMostrada:number=-1;
  //mensagem erro
  public messageEditErr : string;
  //mensagem sucesso
  public messageEditSuccess : string;
  //maximo e minimo de paginas
  private minPages:number=1;
  private maxPages:number=3;


  constructor(private datasheet : DatasheetService) { 
     this._datasheetlist=[];
     this.messageEditErr ="";
     this.messageEditSuccess ="";
     this._searchWord="";
     this._onShow=false;
  }

  public get isEditing() {
    //devolve true se poder ser editado
    return this._onEdit != -1 && !this._onShow;
  }

  public get isShowing() {
    //devolve true se não estiver em modo de listagem do array
    return this._onEdit != -1;
  }

  public deleteDatasheet() : void {
    //delete(_onEdit);
  }
  
  //muda valor de _searchword e actualiza o array para o resultado da query
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

  //envia dados dos inputs para a api
  public saveDatasheet(event) {
    event.preventDefault();
    console.log(event.target);
    
    let data: DatasheetEdit={  
      idobject:event.target.CEARC.value,/**mudar isto para o valor do id quando for corrigido */
      designation: event.target.design.value,
      cearcproc: event.target.CEARC.value,
      cearcprocdata: event.target.CEARCdate.value,
      cearcentrancedata: event.target.CEARCentrydate.value,
      lcrmproc: event.target.LCRM.value,
      lcrmprocdata:event.target.LCRMdate.value,
      lcrmentrancedata: event.target.LCRMentrydate.value,
      coordinatorid: event.target.coordinator.value
    }
    this.datasheet.submitDatasheets(data).subscribe((result) => {
      if(!result.error) {
        this.messageEditSuccess = result.message;
        // this._datasheetlist[this._onEdit]=u;//atualizamos os dados para o cliente
        setTimeout(() => {
          this.messageEditErr ="";
          this.messageEditSuccess ="";
          this._onEdit=-1;
        }, 3 * 1000);//espera 3 segundos antes de sair da pagina de edição
      }else this.messageEditErr = result.message;
    });
  }

  //muda o valor de _onEdit 
  public openFicha(edit : number) {
    this._onEdit=edit;
    if(edit > -1)
    {
      this._onShow=true;
      this._pagMostrada=1;
    }
    else {
      
      this._pagMostrada=-1;
      this._onShow=false;
    }
  }
  //muda a pagina a ser mostrada
  public changePage(page:number){
    this._pagMostrada=page;
  }
  //incrementa/decrementa a pagina a ser mostrada
  public incPage(page:boolean){
    
    if(this._pagMostrada>=this.minPages && this._pagMostrada<=this.maxPages)
    page?this._pagMostrada++:this._pagMostrada--;  
    if(!(this._pagMostrada>=this.minPages&&this._pagMostrada<=this.maxPages))
      page?this._pagMostrada=this.maxPages:this._pagMostrada=this.minPages;  
      
  }
  //muda o valor de _onShow
  public setShowMode(showMode : boolean) {
    this._onShow=showMode;
  }


  ngOnInit() {
    this.searchFichas(null);
  }

}
