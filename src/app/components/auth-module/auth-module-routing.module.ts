import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { IndividualComponent } from './individual/individual.component';
import { UsersComponent } from './users/users.component';
import { RequestComponent } from './request/request.component';
import { ConsumptionComponent } from './consumption/consumption.component';
import { MessageComponent } from './message/message.component';
import { SubGatesComponent } from './sub-gates/sub-gates.component';
import { AdminGuard } from '../../shared/guard/admin.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'individual',
    component: IndividualComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'sub-gates',
    component: SubGatesComponent,
    canActivate: [AdminGuard],
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
