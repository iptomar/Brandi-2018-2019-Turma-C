import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { SuperCategories, Categories, SubCategories, CategoriesService } from '../../services/datasheet/categories.service';
import { take } from 'rxjs/operators';
import { ReceivedData } from 'src/app/Global';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  public superCat$: Subscription;
  public cat$: Subscription;
  public subCat$: Subscription;

  public searchSuperCat: BehaviorSubject<string>;
  public searchCat: BehaviorSubject<string>;
  public searchSubCat: BehaviorSubject<string>;

  public superCat: SuperCategories[];
  public cat: Categories[];
  public subCat: SubCategories[];

  public selectedSuperCat: number;
  public selectedCat: number;
  public selectedSubCat: number;

  public activeSuper: HTMLElement;
  public activeCat: HTMLElement;
  public activeSub: HTMLElement;

  public lastSearchCat: string;
  public lastSearchSubCat: string;

  public superCatEdit: boolean[];
  public catEdit: boolean[];
  public subCatEdit: boolean[];

  public editing: boolean;

  public messageSuccess:string;
  public messageError:string;


  constructor(public categoriesService: CategoriesService) {
    this.searchSuperCat = new BehaviorSubject("");
    this.searchCat = new BehaviorSubject("");
    this.searchSubCat = new BehaviorSubject("");
    this.selectedSuperCat = -1;
    this.selectedCat = -1;
    this.selectedSubCat = -1;
    this.activeSuper = null;
    this.activeCat = null;
    this.activeSub = null
    this.superCat = [];
    this.cat = [];
    this.subCat = [];
    this.lastSearchCat = "";
    this.lastSearchSubCat = "";
    this.superCatEdit = [];
    this.catEdit = [];
    this.subCatEdit = [];
    this.editing = false;
    this.messageSuccess="";
    this.messageError="";
  }

  ngOnInit() {
    //first load
    this.categoriesService.getSuperCategories(this.searchSuperCat.getValue()).subscribe(
      (superCats: SuperCategories[]) => {
        this.superCat = superCats;
      },
      take(1)
    );
    //por cada pesquisa faz um pedido ao servicdor
    this.superCat$ = this.searchSuperCat.asObservable().subscribe(
      (search: string) => {
        this.superCat = [];
        this.cat = [];
        this.subCat = [];
        this.superCatEdit = [];
        this.catEdit = [];
        this.subCatEdit = [];
        this.selectedSuperCat = -1;
        this.selectedCat = -1;
        this.selectedSubCat = -1;
        this.lastSearchCat = "";
        this.lastSearchSubCat = "";
        this.categoriesService.getSuperCategories(search).subscribe(
          (superCats: SuperCategories[]) => {
            this.superCat = superCats;
            this.superCatEdit = new Array(superCats.length).fill(false);
          },
          take(1)
        )
      }
    );

    //por cada pesquisa faz um pedido ao servicdor
    this.cat$ = this.searchCat.asObservable().subscribe(
      (search: string) => {
        this.selectedCat = -1;
        this.selectedSubCat = -1;
        this.cat = [];
        this.subCat = [];
        this.catEdit = [];
        this.subCatEdit = [];
        this.lastSearchSubCat = "";
        if (this.selectedSuperCat > -1) this.categoriesService.getCategories(this.selectedSuperCat, search).subscribe(
          (cats: Categories[]) => {
            this.cat = cats;
            this.catEdit = new Array(cats.length).fill(false);
          },
          take(1)
        )
      }
    );

    //por cada pesquisa faz um pedido ao servicdor
    this.subCat$ = this.searchSubCat.asObservable().subscribe(
      (search: string) => {
        this.subCat = [];
        this.selectedSubCat = -1;
        this.subCatEdit = [];
        if (this.selectedCat > -1) this.categoriesService.getSubCategories(this.selectedCat, search).subscribe(
          (subCats: SubCategories[]) => {
            this.subCat = subCats;
            this.subCatEdit = new Array(subCats.length).fill(false);
          },
          take(1)
        )
      }
    );

  }

  public searchSuperCategory(event) {
    event.preventDefault();
    this.searchSuperCat.next(event.target.searchSuperCat.value);
  }

  public searchCategory(event) {
    event.preventDefault();
    this.lastSearchCat = event.target.searchCat.value;
    this.searchCat.next(event.target.searchCat.value);
  }

  public searchSubCategory(event) {
    event.preventDefault();
    this.lastSearchSubCat = event.target.searchSubCat.value;
    this.searchSubCat.next(event.target.searchSubCat.value);
  }

  public selectSuperCat(event, idSuper: number) {
    if(this.selectedSuperCat === idSuper) return;
    this.selectedSuperCat = idSuper;
    if (this.activeSuper != null) this.activeSuper.classList.remove("active");
    this.activeSuper = (event.target);
    this.activeSuper.classList.add("active");
    this.searchCat.next(this.searchCat.getValue());
    this.lastSearchCat = "";
  }

  public selectSubCat(event, idSubCat: number) {
    if(this.selectedSubCat === idSubCat) return;
    this.selectedSubCat = idSubCat;
    if (this.activeSub != null) this.activeSub.classList.remove("active");
    this.activeSub = (event.target);
    this.activeSub.classList.add("active");
    this.lastSearchSubCat = "";
  }

  public selectCat(event, idCat: number) {
    if(this.selectedCat === idCat) return;
    this.selectedCat = idCat;
    if (this.activeCat != null) this.activeCat.classList.remove("active");
    this.activeCat = (event.target);
    this.activeCat.classList.add("active");
    this.searchSubCat.next(this.searchSubCat.getValue());
  }

  public changeSuperCat(event, index: number) {
    event.preventDefault();
    if (this.superCatEdit[index]) {
      this.messageError = "";
      this.messageSuccess = "";
      let name : string= event.target.supercat.value;
      this.categoriesService.editSuperCat(this.superCat[index].id, name).subscribe(
        (data : ReceivedData) => {
          if(data.error) {
            this.messageError=data.message;
          }else {
            this.messageSuccess=data.message;
            this.superCat[index].supercategory=name;
            this.superCatEdit[index] = false;
            this.editing = false;
          }
          window.scrollTo(0,0);
        },
        take(1)
      );
    } else {
      this.superCatEdit[index] = true;
      this.editing = true;
    }
  }

  public cancelSuperCatEdit($event, index: number) {
    this.superCatEdit[index] = false;
    this.editing = false;
  }

  public changeCat(event, index: number) {
    event.preventDefault();
    if (this.catEdit[index]) {
      this.messageError = "";
      this.messageSuccess = "";
      let name : string= event.target.cat.value;
      this.categoriesService.editCat(this.cat[index].id, name).subscribe(
        (data : ReceivedData) => {
          if(data.error) {
            this.messageError=data.message;
          }else {
            this.messageSuccess=data.message;
            this.cat[index].category=name;
            this.catEdit[index] = false;
            this.editing = false;
          }
          window.scrollTo(0,0);
        },
        take(1)
      );
    } else {
      this.catEdit[index] = true;
      this.editing = true;
    }
  }

  public cancelCatEdit($event, index: number) {
    this.catEdit[index] = false;
    this.editing = false;
  }


  public changeSubCat(event, index: number) {
    event.preventDefault();
    if (this.subCatEdit[index]) {
      this.messageError = "";
      this.messageSuccess = "";
      let name : string= event.target.subcat.value;
      this.categoriesService.editSubCat(this.subCat[index].id, name).subscribe(
        (data : ReceivedData) => {
          if(data.error) {
            this.messageError=data.message;
          }else {
            this.messageSuccess=data.message;
            this.subCat[index].subcategory=name;
            this.subCatEdit[index] = false;
            this.editing = false;
          }
          window.scrollTo(0,0);
        },
        take(1)
      );
    } else {
      this.subCatEdit[index] = true;
      this.editing = true;
    }
  }

  public cancelSubCatEdit($event, index: number) {
    this.subCatEdit[index] = false;
    this.editing = false;
  }

  public deleteSuperCat(index : number) {
    this.messageError = "";
    this.messageSuccess = "";
    this.categoriesService.deleteSuperCat(this.superCat[index].id).subscribe(
      (data : ReceivedData) => {
        if(data.error) {
          this.messageError=data.message;
        }else {
          this.messageSuccess=data.message;
          this.superCat.splice(index,1);
          this.superCatEdit.splice(index,1);
        }
        window.scrollTo(0,0);
      },
      take(1)
    );
  }

  public deleteCat(index : number) {
    this.messageError = "";
    this.messageSuccess = "";
    this.categoriesService.deleteCat(this.cat[index].id).subscribe(
      (data : ReceivedData) => {
        if(data.error) {
          this.messageError=data.message;
        }else {
          this.messageSuccess=data.message;
          this.cat.splice(index,1);
          this.catEdit.splice(index,1);
        }
        window.scrollTo(0,0);
      },
      take(1)
    );
  }

  public newSuperCat(event) {
    event.preventDefault();
    this.messageError = "";
    this.messageSuccess = "";
    let name : string = event.target.supercat.value;
    this.categoriesService.createSuperCat(name).subscribe(
      (data : ReceivedData) => {
        if(data.error) {
          this.messageError=data.message;
        }else {
          this.messageSuccess=data.message;
          this.superCat.push({id: data.res.id, supercategory: name});
          this.superCatEdit.push(false);
          event.target.supercat.value="";
        }
        window.scrollTo(0,0);
      },
      take(1)
    );
  }
  public newCat(event) {
    event.preventDefault();
    this.messageError = "";
    this.messageSuccess = "";
    let name : string = event.target.cat.value;
    let selectSuper : number = this.selectedSuperCat;
    this.categoriesService.createCat(name, selectSuper).subscribe(
      (data : ReceivedData) => {
        if(data.error) {
          this.messageError=data.message;
        }else {
          this.messageSuccess=data.message;
          this.cat.push({id: data.res.id, category: name, id_super_category: selectSuper});
          this.catEdit.push(false);
          event.target.cat.value="";
        }
        window.scrollTo(0,0);
      },
      take(1)
    );
  }
  public newSubCat(event) {
    event.preventDefault();
    this.messageError = "";
    this.messageSuccess = "";
    let name : string = event.target.subcat.value;
    let selectCat : number = this.selectedCat;
    this.categoriesService.createSubCat(name, selectCat).subscribe(
      (data : ReceivedData) => {
        if(data.error) {
          this.messageError=data.message;
        }else {
          this.messageSuccess=data.message;
          this.subCat.push({id: data.res.id, subcategory: name, id_category: selectCat});
          this.subCatEdit.push(false);
          event.target.cat.value="";
        }
        window.scrollTo(0,0);
      },
      take(1)
    );
  }

  public deleteSubCat(index : number) {
    this.messageError = "";
    this.messageSuccess = "";
    this.categoriesService.deleteSubCat(this.subCat[index].id).subscribe(
      (data : ReceivedData) => {
        if(data.error) {
          this.messageError=data.message;
        }else {
          this.messageSuccess=data.message;
          this.subCat.splice(index,1);
          this.subCatEdit.splice(index,1);
        }
        window.scrollTo(0,0);
      },
      take(1)
    );
  }

  ngOnDestroy(): void {
    this.superCat$.unsubscribe();
    this.cat$.unsubscribe();
    this.subCat$.unsubscribe();
  }
}
