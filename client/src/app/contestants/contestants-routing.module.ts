
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContestantsComponent } from './contestants.component';

const routes: Routes = [
    {
        path: '',
        component: ContestantsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContestantsRoutingModule {}
