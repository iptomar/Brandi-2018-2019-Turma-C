import { Component, OnInit } from '@angular/core';
import { DatasheetService, Datasheet } from 'src/app/services/datasheet/datasheet.service';
import { Global } from 'src/app/Global';
import { User } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-datasheet-create',
  templateUrl: './datasheet-create.component.html',
  styleUrls: ['./datasheet-create.component.scss']
})
export class DatasheetCreateComponent implements OnInit {

  public messageEditErr : string;
  public messageEditSuccess : string;
  public _users : User[];
  constructor(public _datasheet : DatasheetService, private users : UsersService) {
    
    this.messageEditErr ="";
    this.messageEditSuccess ="";
    this.users.getUsers("").subscribe((users_list) => {
      this._users=users_list;
    });
   }
   public submitData(event){
     
    event.preventDefault();
    let data: Datasheet=DatasheetService.createCleanDatasheet();
      data.object_designation= event.target.design.value;
      data.CEARC_process= event.target.CEARC.value;
      data.CEARC_process_date= event.target.CEARCdate.value;
      data.CEARC_entry_date= event.target.CEARCentrydate.value;
      data.LCRM_process= event.target.LCRM.value;
      data.LCRM_process_date=event.target.LCRMdate.value;
      data.LCRM_entry_date= event.target.LCRMentrydate.value;
      data.coordinator= event.target.coordinator.value;
      this.messageEditErr ="";
      this.messageEditSuccess ="";
      window.scroll(0,0);
      this._datasheet.submitDatasheets(data,0).subscribe((result) => {
        if(!result.error) {
          this.messageEditSuccess = result.message;
          // this._datasheetlist[this._onEdit]=u;//atualizamos os dados para o cliente
          event.target.design.value="";
          event.target.CEARC.value="";
          event.target.CEARCdate.value="";
          event.target.CEARCentrydate.value="";
          event.target.LCRM.value="";
          event.target.LCRMdate.value="";
          event.target.LCRMentrydate.value="";
          event.target.coordinator.value="";
        }else this.messageEditErr = result.message;
      });
    
   }

  ngOnInit() {
  }

}
