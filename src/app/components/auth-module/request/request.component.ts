import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { RequestService } from '../../../services/request.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  requestData: number;
  user: any;
  today: string;
  data: any;
  requestResponse = [];
  generateData;
  totalRequestList = [];
  avgUse;

  constructor(
    private dataService: DataService,
    private requestService: RequestService
    ) { }

  ngOnInit(): void {
    this.user = this.dataService.getUserDetails();
    const dateObject = new Date();
    this.today = dateObject.getDate() + '/' + (dateObject.getMonth() + 1) + '/' + dateObject.getFullYear();
    this.getRequestData();
    this.getGenerateData();
    this.findAvgUse();
  }

  sendRequest(){
    this.data = {
      date: this.today,
      date_time: new Date(),
      uid: this.user.userid,
      name: this.user.name,
      meter_id: this.user.meter_id,
      sub_gate_name: this.user.sub_gate_name,
      sub_gate_id: this.user.sub_gate_id,
      request_value: this.requestData,
      avg_use: this.avgUse
    }
    this.requestService.sendRequest(this.data).then(()=>{
      console.log('send Request')
    }).catch(_error => {
      // this.error = _error;
      // console.log(this.error)
    })
  }

  getRequestData(){
    this.requestService.getRequestData(this.today, this.user.userid).subscribe(res => {
      this.requestResponse = res;
    });
  }

  findAvgUse(){
    this.requestService.getRequestUserData(this.user.userid).subscribe(res => {
      this.totalRequestList = res;
      if(this.totalRequestList.length) {
        var sum = 0;
        this.totalRequestList.forEach((item)=>{
          sum = sum + item.payload.doc.data().request_value
        });
        this.avgUse = sum/(this.totalRequestList.length);
      } else {
        this.avgUse = 0;
      }
    });
  }

  getGenerateData(){
    this.requestService.getGeneratedData(this.today).subscribe(res => {
      this.generateData = res;
    });
  }
}
