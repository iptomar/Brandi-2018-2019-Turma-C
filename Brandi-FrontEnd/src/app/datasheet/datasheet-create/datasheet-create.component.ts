import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { DatasheetService, Datasheet } from 'src/app/services/datasheet/datasheet.service';
import { Global } from 'src/app/Global';
import { User } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';
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
  public _users : User[];
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
    this.users.getUsers("").subscribe((users_list) => {
      this._users=users_list;
    });
    this.id_super_category= new BehaviorSubject<number>(0);
    this.id_category= new BehaviorSubject<number>(0);
   }
   public submitData(event){
     
    event.preventDefault();
    let data: any={};
      data.id =-1;
      data.object_designation= event.target.design.value;
      data.CEARC_process= event.target.CEARC.value;
      data.CEARC_process_date= event.target.CEARCdate.value;
      data.CEARC_entry_date= event.target.CEARCentrydate.value;
      data.LCRM_process= event.target.LCRM.value;
      data.LCRM_process_date=event.target.LCRMdate.value;
      data.LCRM_entry_date= event.target.LCRMentrydate.value;
      data.coordinator= event.target.coordinator.value;
      data.super_category=event.target.supercategory.value;
      data.category=event.target.category.value;
      data.sub_category=event.target.subcategory.value;
      this.messageEditErr ="";
      this.messageEditSuccess ="";
      window.scroll(0,0);
      this._datasheet.submitDatasheets(data,0).subscribe((result) => {
        if(!result.error) {
          this.messageEditSuccess = result.message;
          setTimeout(()=> {
            this.router.navigate(["datasheet/edit",result.res.id]);
          },3000);
        }else this.messageEditErr = result.message;
      });
    
   }
   ngOnInit() {
    this.super_categories$ = this.categoriesService.getSuperCategories("");
    this.id_category$ = this.id_super_category.asObservable().subscribe((id_super:number) =>  this.categoriesService.getCategories(id_super,"").subscribe((data : Categories[]) => {
      this.categories = data;
      this.sub_categories = [];
      this.categorySelect.nativeElement.value="";
      this.subcategorySelect.nativeElement.value="";
    }, take(1)
    ));
    this.id_sub_category$ = this.id_category.asObservable().subscribe((id_cat:number) => this.categoriesService.getSubCategories(id_cat,"").subscribe((data : SubCategories[]) => {
      this.sub_categories = data;
      this.subcategorySelect.nativeElement.value="";
    }, take(1)
    ));
  }
  ngOnDestroy(): void {
    this.id_category$.unsubscribe();
    this.id_sub_category$.unsubscribe();
  }
}
