import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { GateService } from '../../../services/gate.service';

@Component({
  selector: 'app-add-edit-sub-gate',
  templateUrl: './add-edit-sub-gate.component.html',
  styleUrls: ['./add-edit-sub-gate.component.scss']
})
export class AddEditSubGateComponent implements OnInit {
  gateName: string = '';
  waterRate: number = 10;
  data: any;
  editData: any;
  docId;
  isEdit = false;

  constructor(
    public dialogRef: MatDialogRef<AddEditSubGateComponent>,
    private gateService: GateService,
    @Inject(MAT_DIALOG_DATA) data
    ) {
      if(data){
        this.editData = data.data;
        this.docId = data.id;
        this.gateName = data.data.gate_name;
        this.waterRate = data.data.water_rate;
        this.isEdit = true;
      }
    }

  ngOnInit(): void {
  }

  addGate(){
    this.data = {
      gate_name: this.gateName,
      water_rate: this.waterRate,
      added_at: new Date()
    }
    if (this.gateName && this.waterRate) {
      this.gateService.createGate(this.data).then(()=>{
        this.dialogRef.close();
        // this.router.navigate[('/home')]
      }).catch(_error => {
        // this.router.navigate[('/register')]
      })
    }
    
  }

  editGate(){
    this.data = {
      water_rate: this.waterRate
    }
    if (this.gateName && this.waterRate) {
      this.gateService.editGate(this.data, this.docId);
      this.dialogRef.close(true);
    }
  }

}
