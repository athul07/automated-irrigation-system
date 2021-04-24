import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../services/request.service';
import { DataService } from '../../../shared/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.scss']
})
export class ConsumptionComponent implements OnInit {
  requestList = [];
  user: any;
  userId: string;

  constructor(
    private requestService: RequestService, 
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['user_id'];
    });
    this.user = this.dataService.getUserDetails();
    this.userId ? this.getRequestList(this.userId): this.getRequestList(this.user.userid) ;
    
  }

  getRequestList(id){
    this.requestService.getUserRequestList(id).subscribe(res => {
      this.requestList = res;
    });
  }

  backToUserList() {
    this.router.navigateByUrl(`users`);
  }
}
