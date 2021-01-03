import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../services/request.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isGenerated: boolean = false;
  today: string;
  requestList: any;
  totalRequest: number;
  waterInDam: any[] = [];

  constructor(private requestService: RequestService,) { }

  ngOnInit(): void {
    const dateObject = new Date();
    this.today = dateObject.getDate() + '/' + (dateObject.getMonth() + 1) + '/' + dateObject.getFullYear();
    this.getRequestList();
    this.getWaterInDam();
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
      console.log('qq', this.waterInDam)
      if(this.waterInDam.length === 0){
        const data = {
          date: this.today,
          water_level: Math.floor(Math.random() * 100) + 5000,
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

}
