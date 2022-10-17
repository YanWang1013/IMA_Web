
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExecutiveTeamComponent } from './executive-team.component';

const routes: Routes = [
    {
        path: '',
        component: ExecutiveTeamComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExecutiveTeamRoutingModule {}
