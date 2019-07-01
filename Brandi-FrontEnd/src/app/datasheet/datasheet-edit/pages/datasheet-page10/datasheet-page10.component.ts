import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DatasheetPage } from '../../datasheet-edit.component';
import { Datasheet } from 'src/app/services/datasheet/datasheet.service';
import { Observable } from 'rxjs';
import { SourcesService, Source } from 'src/app/services/datasheet/sources.service';
import { take } from 'rxjs/operators';
import { ReceivedData } from 'src/app/Global';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-datasheet-page10',
  templateUrl: './datasheet-page10.component.html',
  styleUrls: ['./datasheet-page10.component.scss']
})

export class DatasheetPage10Component implements OnInit, DatasheetPage {
  @ViewChild("newSource") newSource : ElementRef;
  @ViewChild("modal_sources") modal_sources : ElementRef;
  @ViewChild("modal_sourcesBt") modal_sourcesBt : ElementRef;
  
  _datasheet: Datasheet;
  _isEditing: boolean;
  _fonts$:Observable<Source[]>;
  _lastSearch:string;
  messageEditSuccessSource:string;
   messageEditErrSource:string;
   addNewOrEdit:number;

  /**Metodo que vai ser executado para cada child do create edit page 1, ... ,page 10*/
  getForm(event: any): Datasheet {
    event.preventDefault();
    return this._datasheet;
  }

  datasheet(datasheet: Datasheet): void {
    this._datasheet = datasheet;
    this._lastSearch="";
    this.updtSources("");
  }

  isEditing(isEditing: boolean): void {
    this._isEditing = isEditing;
  }

  constructor(public sourcesService : SourcesService, private datePipe:DatePipe) {
    this._isEditing = false;
    this._lastSearch="";
    this.messageEditSuccessSource="";
    this.messageEditErrSource="";
    this.addNewOrEdit=-1;
  }

  ngOnInit() {
  }

  searchSource(event) {
    event.preventDefault();
    this._lastSearch=event.target.searchBox.value;
    this.updtSources(event.target.searchBox.value);
  }

  public editSource(source_id : number, source_type_set : number,source:string,source_type:string,source_site:string,source_quota:string,source_date:Date) {
    this.newSource.nativeElement.source_type_set.value=source_type_set;
    this.newSource.nativeElement.source.value=source;
    this.newSource.nativeElement.source_type.value=source_type;
    this.newSource.nativeElement.source_site.value=source_site;
    this.newSource.nativeElement.source_quota.value=source_quota;
    this.newSource.nativeElement.source_date.value=this.datePipe.transform(source_date, "yyyy-MM-dd");
    this.addNewOrEdit=source_id;
  }

  public addNewFontBt() {
    this.addNewOrEdit=-1;
  }

  public deleteSource(idSource : number) {
    if(!confirm("Tem a certeza que pretende eliminar a fonte?")) return;
    this.sourcesService.deleteSource(idSource).subscribe((data : ReceivedData) => {
      this.updtSources(this._lastSearch);
    }, take(1));
  }

  public updtSources(search : string) {
    this._fonts$=this.sourcesService.getSources(this._datasheet.id,search);
  }

  public addNewSource(event) {
    event.preventDefault();
    let source_type_set = event.target.source_type_set.value;
    let source = event.target.source.value;
    let source_type = event.target.source_type.value;
    let source_site = event.target.source_site.value;
    let source_quota = event.target.source_quota.value;
    let source_date = event.target.source_date.value;
    if(this.addNewOrEdit < 0){
      this.sourcesService.createSource(this._datasheet.id,source_type_set,source,source_type,source_site,source_quota,source_date).subscribe(this.requestedAddEdit.bind(this),take(1));
    } else {
      this.sourcesService.editSource(this.addNewOrEdit,source_type_set,source,source_type,source_site,source_quota,source_date).subscribe(this.requestedAddEdit.bind(this),take(1));
    }
  }

  private requestedAddEdit(data : ReceivedData) {
    if(!data.error) {
      this.messageEditSuccessSource=data.message;
      this.updtSources(this._lastSearch);
      setTimeout(() => {
        if(this.addNewOrEdit < 0)this.newSource.nativeElement.reset();
        this.messageEditErrSource="";
        this.messageEditSuccessSource="";
      },3 *1000);
    }else {
      this.messageEditErrSource=data.message;
    }
  }
}
