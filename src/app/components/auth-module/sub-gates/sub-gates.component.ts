import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditSubGateComponent } from '../add-edit-sub-gate/add-edit-sub-gate.component';
import { GateService } from '../../../services/gate.service';

@Component({
  selector: 'app-sub-gates',
  templateUrl: './sub-gates.component.html',
  styleUrls: ['./sub-gates.component.scss']
})
export class SubGatesComponent implements OnInit {
  gateList: any[] = [];

  constructor(
    private dialog: MatDialog,
    private gateService: GateService,
  ) { }

  ngOnInit(): void {
    this.getGateList();
  }

  addNewGate() {
    window.scrollTo(0, 0);
    const dialogRef = this.dialog.open(AddEditSubGateComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        
      } else {
      }
    });
  }

  getGateList(){
    this.gateService.getGetList().subscribe(res => {
      this.gateList = res;
    });
  }

  edit(data, id){
    const dialogRef = this.dialog.open(AddEditSubGateComponent, {
      data: {
        data: data,
        id: id
      }
    });
    // dialogRef.afterClosed().subscribe(dialogResult => {
    //   if (dialogResult === true) {
        
    //   }
    // });
  }

}
