
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecentWinnerComponent } from './recent-winner.component';

const routes: Routes = [
    {
        path: '',
        component: RecentWinnerComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecentWinnerRoutingModule {}
