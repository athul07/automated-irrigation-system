import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { IndividualComponent } from './individual/individual.component';
import { UsersComponent } from './users/users.component';
import { RequestComponent } from './request/request.component';
import { ConsumptionComponent } from './consumption/consumption.component';
import { MessageComponent } from './message/message.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'individual',
    component: IndividualComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'request',
    component: RequestComponent,
  },
  {
    path: 'consumption',
    component: ConsumptionComponent,
  },
  {
    path: 'message',
    component: MessageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthModuleRoutingModule { }
