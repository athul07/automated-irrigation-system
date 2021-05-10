import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../services/request.service';
import { MatDialog } from '@angular/material/dialog';
import { EditRequestComponent } from '../edit-request/edit-request.component';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.scss']
})
export class IndividualComponent implements OnInit {
  today: string;
  requestList = [];
  generateData = [];
  selectedDate: string;
  dateList = [];

  constructor(private requestService: RequestService, private dialog: MatDialog,) { }

  ngOnInit(): void {
    const dateObject = new Date();
    this.today = dateObject.getDate() + '/' + (dateObject.getMonth() + 1) + '/' + dateObject.getFullYear();
    this.selectedDate = this.today;
    this.getRequestList(this.today);
    this.getGenerateData();
    this.getDateList();
  }

  getRequestList(date){
    this.requestService.getRequestList(date).subscribe(res => {
      this.requestList = res;
    });
  }

  getGenerateData() {
    this.requestService.getGeneratedData(this.today).subscribe(res => {
      this.generateData = res;
    });
  }

  edit(data, id){
    const dialogRef = this.dialog.open(EditRequestComponent, {
      data: {
        data: data,
        id: id
      }
    });
    // dialogRef.afterClosed().subscribe(dialogResult => {
    //   if (dialogResult === true) {
        
    //   }
    // });
  }

  getDateList() {
    this.requestService.getWaterInDamList().subscribe(res => {
      this.dateList = res;
    });
  }

  selectDate(date) {
    this.selectedDate = date;
    this.getRequestList(this.selectedDate);
  }
}
