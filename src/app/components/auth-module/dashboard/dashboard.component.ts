import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../services/request.service';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isGenerated: boolean = false;
  today: string;
  requestList: any;
  totalRequest: number = 0;
  waterInDam: any[] = [];
  data: any;
  user: any;
  generateData = [];
  now: any;
  remainingTime = 1;

  constructor(private requestService: RequestService, private dataService: DataService,) {
    setInterval(() => {
      this.now = new Date();
      if(this.generateData.length !== 0){
        if(this.remainingTime>0){
          var hourDiff = this.generateData[0]?.payload.doc.data().end_time.toDate() - this.now;
          var diffHrs = Math.floor((hourDiff % 86400000) / 3600000);
          var diffMins = Math.round(((hourDiff % 86400000) % 3600000) / 60000);
          this.remainingTime = diffMins + (diffHrs * 60);
        } else {
          this.remainingTime = 0;
        }
        this.requestList.forEach((x)=>{
          var tt = this.generateData[0]?.payload.doc.data().date_time.toDate()
          tt.setMinutes( tt.getMinutes() +  (x.payload.doc.data().request_value/5));
          if(tt > this.now) {
            var hourDiff = tt - this.now;
            var diffHrs = Math.floor((hourDiff % 86400000) / 3600000);
            var diffMins = Math.round(((hourDiff % 86400000) % 3600000) / 60000);
            x.remaining_time = diffMins + (diffHrs * 60);
          } else {
            x.remaining_time = 0;
          }
          
        });
      }
    }, 1);
  }

  ngOnInit(): void {
    this.user = this.dataService.getUserDetails();
    const dateObject = new Date();
    this.today = dateObject.getDate() + '/' + (dateObject.getMonth() + 1) + '/' + dateObject.getFullYear();
    this.getRequestList();
    this.getWaterInDam();
    this.getGenerateData();
  }

  getRequestList(){
    this.requestService.getRequestList(this.today).subscribe(res => {
      this.requestList = res;
      this.totalRequest = this.requestList.reduce((sum, current) => sum + current.payload.doc.data().request_value, 0);
    });
  }

  getWaterInDam() {
    this.requestService.getWaterInDam(this.today).subscribe(res => {
      this.waterInDam = res;
      if(this.waterInDam.length === 0){
        const data = {
          date: this.today,
          water_level: Math.floor(Math.random() * 1000) + 100000,
          water_rate: Math.floor(Math.random() * 10) + 10
        }
        this.requestService.setWaterInDam(data).then(()=>{
          console.log('wwwww')
        }).catch(_error => {
          // this.error = _error;
          // console.log(this.error)
        })
      }
    });
  }

  generate(){
    // this.isGenerated = !this.isGenerated;
    var dateTime = new Date();
    dateTime.setMinutes( dateTime.getMinutes() + Math.round(this.totalRequest/this.waterInDam[0]?.payload.doc.data().water_rate) );
    this.data = {
      date: this.today,
      uid: this.user.userid,
      is_generated: true,
      water_in_dam: this.waterInDam[0]?.payload.doc.data().water_level,
      total_request: this.totalRequest,
      date_time: new Date(),
      end_time: dateTime
    }
    this.requestService.generateAction(this.data).then(()=>{
      console.log('generated')
      this.isGenerated = true;
      this.now = new Date();
    }).catch(_error => {
      // this.error = _error;
      // console.log(this.error)
    })
  }

  getGenerateData() {
    this.requestService.getGeneratedData(this.today).subscribe(res => {
      this.generateData = res;
    });
  }
}
