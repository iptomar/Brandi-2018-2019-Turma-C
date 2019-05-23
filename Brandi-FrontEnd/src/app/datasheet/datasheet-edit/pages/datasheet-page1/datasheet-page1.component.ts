import { Component, OnInit, ɵConsole, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Datasheet, DatasheetService } from 'src/app/services/datasheet/datasheet.service';
import { Type } from '@angular/compiler';
import { Global } from 'src/app/Global';
import { User } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';
import { DatasheetPage } from '../../datasheet-edit.component';
import { Observable, Subscribable, BehaviorSubject, Subscriber, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { CategoriesService, SuperCategories, Categories, SubCategories } from 'src/app/services/datasheet/categories.service';

@Component({
  selector: 'app-datasheet-page1',
  templateUrl: './datasheet-page1.component.html',
  styleUrls: ['./datasheet-page1.component.scss']
})
export class DatasheetPage1Component implements OnInit, DatasheetPage, OnDestroy {
  @ViewChild("categorySelect") categorySelect : ElementRef;
  @ViewChild("subcategorySelect") subcategorySelect : ElementRef;

  public _datasheet: Datasheet;
  public _isEditing: boolean;
  public _users: User[];
  public super_category: BehaviorSubject<number>;
  public category: BehaviorSubject<number>;
  public super_categories$ : Observable<SuperCategories[]>;
  public categories : Categories[];
  public sub_categories : SubCategories[];
  public id_sub_category$  : Subscription;
  public id_category$  : Subscription;
  public firstload:boolean;

  constructor(public users: UsersService,public categoriesService : CategoriesService, public datasheetService : DatasheetService, public global : Global) {
    this._isEditing = false;
    this._users = [];
    this.users.getUsers("").subscribe((users_list) => {
      this._users = users_list;
    });
    this.firstload=true;
    this.super_category= new BehaviorSubject<number>(0);
    this.category= new BehaviorSubject<number>(0);
  }

  datasheet(datasheet: Datasheet): void {
    if(datasheet == null) return;
    this._datasheet = datasheet;
    this.firstload=true;
    this.super_category.next(this._datasheet.super_category);
    this.category.next(this._datasheet.category);
  }
  isEditing(isEditing: boolean): void {
    this._isEditing = isEditing;
  }

  public getForm(event: any): Datasheet {
    let datasheet: Datasheet = Object.assign({}, this._datasheet); // clona os dados
    datasheet.object_designation = event.target.design.value;
    datasheet.CEARC_process = event.target.CEARC.value;
    datasheet.CEARC_process_date = Global.stringToDate(event.target.CEARCdate.value);
    datasheet.CEARC_entry_date = Global.stringToDate(event.target.CEARCentrydate.value);
    datasheet.LCRM_process = event.target.LCRM.value;
    datasheet.LCRM_process_date = Global.stringToDate(event.target.LCRMdate.value);
    datasheet.LCRM_entry_date = Global.stringToDate(event.target.LCRMentrydate.value);
    datasheet.coordinator = event.target.coordinator.value;
    datasheet.coordinator_name = event.target.coordinator.value;
    datasheet.super_category=event.target.supercategory.value;
    datasheet.category=event.target.category.value;
    datasheet.sub_category=event.target.subcategory.value;
    return datasheet;
  }

  public resetSelect() {
    this.categorySelect.nativeElement.value="";
    this._datasheet.category=0;
    this.resetSelectCat();
  }

  public resetSelectCat() {
    this.subcategorySelect.nativeElement.value="";
    this._datasheet.sub_category=0;
  }

  ngOnInit() {    
    this.super_categories$ = this.categoriesService.getSuperCategories("");
    this.id_category$ = this.super_category.asObservable().subscribe((id_super:number) =>  this.categoriesService.getCategories(id_super,"").subscribe((data : Categories[]) => {
      this.categories = data;
      this.sub_categories = [];
    }, take(1)
    ));
    this.id_sub_category$ = this.category.asObservable().subscribe((id_cat:number) => this.categoriesService.getSubCategories(id_cat,"").subscribe((data : SubCategories[]) => {
      this.sub_categories = data;
      this.subcategorySelect.nativeElement.value="";
      this.firstload=false;
    }, take(1)
    ));
  }
  ngOnDestroy(): void {
    this.id_category$.unsubscribe();
    this.id_sub_category$.unsubscribe();
  }

}
