import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../services/request.service';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.scss']
})
export class ConsumptionComponent implements OnInit {
  requestList: any;
  user: any;

  constructor(private requestService: RequestService, private dataService: DataService,) { }

  ngOnInit(): void {
    this.user = this.dataService.getUserDetails();
    this.getRequestList();
  }

  getRequestList(){
    this.requestService.getUserRequestList(this.user.userid).subscribe(res => {
      this.requestList = res;
    });
  }

}
