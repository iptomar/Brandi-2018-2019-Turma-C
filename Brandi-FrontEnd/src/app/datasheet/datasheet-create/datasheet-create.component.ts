import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { DatasheetService } from 'src/app/services/datasheet/datasheet.service';
import { Global } from 'src/app/Global';
import { User } from 'src/app/services/auth/auth.service';
import { UsersService, UserNames } from 'src/app/services/users/users.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { CategoriesService, Categories, SuperCategories, SubCategories } from 'src/app/services/datasheet/categories.service';

@Component({
  selector: 'app-datasheet-create',
  templateUrl: './datasheet-create.component.html',
  styleUrls: ['./datasheet-create.component.scss']
})
export class DatasheetCreateComponent implements OnInit, OnDestroy {
  @ViewChild("categorySelect") categorySelect : ElementRef;
  @ViewChild("subcategorySelect") subcategorySelect : ElementRef;
  
  public messageEditErr : string;
  public messageEditSuccess : string;
  public _users : UserNames[];
  public id_super_category: BehaviorSubject<number>;
  public id_category: BehaviorSubject<number>;
  public super_categories$ : Observable<SuperCategories[]>;
  public categories : Categories[];
  public sub_categories : SubCategories[];
  public id_sub_category$  : Subscription;
  public id_category$  : Subscription;
  constructor(public _datasheet : DatasheetService,public categoriesService : CategoriesService, private users : UsersService, private router : Router, public datasheetService : DatasheetService) {
    
    this.messageEditErr ="";
    this.messageEditSuccess ="";
    this.users.getUsersNames("").subscribe((users_list) => {
      this._users=users_list;
    });
    this.id_super_category= new BehaviorSubject<number>(0);
    this.id_category= new BehaviorSubject<number>(0);
   }
   public submitData(event){
     
    event.preventDefault();
    let datasheet: any={};
      datasheet.id =-1;
      datasheet.object_designation = event.target.design.value;
      datasheet.CEARC_process = event.target.CEARC.value;
      datasheet.CEARC_process_date = Global.stringToDate(event.target.CEARCdate.value);
      datasheet.CEARC_entry_date = Global.stringToDate(event.target.CEARCentrydate.value);
      datasheet.LCRM_process = event.target.LCRM.value;
      datasheet.LCRM_process_date = Global.stringToDate(event.target.LCRMdate.value);
      datasheet.LCRM_entry_date = Global.stringToDate(event.target.LCRMentrydate.value);
      datasheet.coordinator = event.target.coordinator.value;
      datasheet.super_category=event.target.supercategory.value;
      datasheet.category=event.target.category.value;
      datasheet.sub_category=event.target.subcategory.value;
      this.messageEditErr ="";
      this.messageEditSuccess ="";
      window.scroll(0,0);
      this._datasheet.submitDatasheets(datasheet,0).subscribe((result) => {
        if(!result.error) {
          this.messageEditSuccess = result.message;
          setTimeout(()=> {
            this.router.navigate(["datasheet/edit",result.res.id]);
          },3000);
        }else this.messageEditErr = result.message;
      });
    
   }

   
  public resetSelect() {
    this.categorySelect.nativeElement.value="";
    this.resetSelectCat();
  }

  public resetSelectCat() {
    this.subcategorySelect.nativeElement.value="";
  }

   ngOnInit() {
    this.id_sub_category$ = this.id_category.asObservable().subscribe((id_cat:number) => this.categoriesService.getSubCategories(id_cat,"").subscribe((data : SubCategories[]) => {
      this.sub_categories = data;
    }, take(1)
    ));
    this.id_category$ = this.id_super_category.asObservable().subscribe((id_super:number) =>  this.categoriesService.getCategories(id_super,"").subscribe((data : Categories[]) => {
      this.categories = data;
      this.sub_categories = [];
    }, take(1)
    ));
    this.super_categories$ = this.categoriesService.getSuperCategories("");
  }
  ngOnDestroy(): void {
    this.id_category$.unsubscribe();
    this.id_sub_category$.unsubscribe();
  }
}
