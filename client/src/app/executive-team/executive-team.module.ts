import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExecutiveTeamComponent } from './executive-team.component';
import { ExecutiveTeamRoutingModule } from './executive-team-routing.module';
@NgModule({
  declarations: [
    ExecutiveTeamComponent
  ],
  imports: [
    CommonModule,
    ExecutiveTeamRoutingModule
  ]
})
export class ExecutiveTeamModule { }
