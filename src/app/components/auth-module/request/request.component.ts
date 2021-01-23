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
  }

  sendRequest(){
    this.data = {
      date: this.today,
      uid: this.user.userid,
      name: this.user.name,
      meter_id: this.user.meter_id,
      request_value: this.requestData
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
      console.log(res)
    });
  }

  getGenerateData(){
    this.requestService.getGeneratedData(this.today).subscribe(res => {
      this.generateData = res;
      console.log(res)
    });
  }
}
