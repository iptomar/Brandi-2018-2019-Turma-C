import { Component, OnInit } from '@angular/core';
import { DatasheetService, DatasheetCreate } from 'src/app/services/datasheet/datasheet.service';

@Component({
  selector: 'app-datasheet-create',
  templateUrl: './datasheet-create.component.html',
  styleUrls: ['./datasheet-create.component.scss']
})
export class DatasheetCreateComponent implements OnInit {

  public messageEditErr : string;
  public messageEditSuccess : string;
  constructor(private _datasheet : DatasheetService) {
    
    this.messageEditErr ="";
    this.messageEditSuccess ="";
   }
   public submitData(event){
     
    event.preventDefault();
    let data: DatasheetCreate={  
      designation: event.target.design.value,
      cearcproc: event.target.CEARC.value,
      cearcprocdata: event.target.CEARCdate.value,
      cearcentrancedata: event.target.CEARCentrydate.value,
      lcrmproc: event.target.LCRM.value,
      lcrmprocdata:event.target.LCRMdate.value,
      lcrmentrancedata: event.target.LCRMentrydate.value,
      coordinatorid: event.target.coordinator.value
    }
    this._datasheet.submitDatasheets(data).subscribe((cena) => {
      console.log(cena);
      this.messageEditSuccess=cena;
    });
    
   }

  ngOnInit() {
  }

}
