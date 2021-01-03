import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  message: string;
  user: any;
  today: string;
  messageList: any[] = [];

  constructor(private dataService: DataService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.user = this.dataService.getUserDetails();
    const dateObject = new Date();
    this.today = dateObject.getDate() + '/' + (dateObject.getMonth() + 1) + '/' + dateObject.getFullYear();
    this.getMessages();
  }

  sendMessage(){
    const data = {
      date: this.today,
      uid: this.user.userid,
      message: this.message,
      date_time: new Date()
    }
    this.messageService.sendMessage(data).then(()=>{
      console.log('send Message');
      this.message = '';
    }).catch(_error => {
      // this.error = _error;
      // console.log(this.error)
    })
  }

  getMessages(){
    this.messageService.getMessages(this.today).subscribe(res => {
      this.messageList = res;
    });
  }
}
