
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VoteSuccessComponent } from './vote-success.component';

const routes: Routes = [
    {
        path: '',
        component: VoteSuccessComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VoteSuccessRoutingModule {}
