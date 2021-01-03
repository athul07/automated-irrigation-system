import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../services/request.service';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.scss']
})
export class IndividualComponent implements OnInit {
  today: string;
  requestList: any;

  constructor(private requestService: RequestService,) { }

  ngOnInit(): void {
    const dateObject = new Date();
    this.today = dateObject.getDate() + '/' + (dateObject.getMonth() + 1) + '/' + dateObject.getFullYear();
    this.getRequestList();
  }

  getRequestList(){
    this.requestService.getRequestList(this.today).subscribe(res => {
      this.requestList = res;
    });
  }

}
