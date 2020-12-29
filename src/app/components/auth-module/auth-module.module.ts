import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthModuleRoutingModule } from './auth-module-routing.module';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { IndividualComponent } from './individual/individual.component';
import { UsersComponent } from './users/users.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { RequestComponent } from './request/request.component';
import { ConsumptionComponent } from './consumption/consumption.component';
import { MessageComponent } from './message/message.component';


@NgModule({
  declarations: [
    DashboardComponent,
    IndividualComponent,
    UsersComponent,
    AddEditUserComponent,
    RequestComponent,
    ConsumptionComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    AuthModuleRoutingModule,
    FormsModule
  ],
  entryComponents: [
  ]
})
export class AuthModuleModule { }
