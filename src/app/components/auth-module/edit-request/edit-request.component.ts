import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { RequestService } from '../../../services/request.service';

@Component({
  selector: 'app-edit-request',
  templateUrl: './edit-request.component.html',
  styleUrls: ['./edit-request.component.scss']
})
export class EditRequestComponent implements OnInit {
  requestValue;
  name;
  data;
  docId;
  meterId;
  showLoader = false;

  constructor(
    private requestService: RequestService,
    public dialogRef: MatDialogRef<EditRequestComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      if(data){
        this.data = data.data;
        this.docId = data.id;
        this.requestValue = this.data.request_value;
        this.name = this.data.name;
        this.meterId = this.data.meter_id;
      }
    }

  ngOnInit(): void {
    console.log('a', this.data, this.docId)
  }

  edit(){
    this.showLoader = true;
    this.data.request_value = this.requestValue;
    this.requestService.editRequest(this.data, this.docId);
    this.dialogRef.close(true);
    this.showLoader = false;
  }

  cancel(){
    this.dialogRef.close(false);
  }

}
