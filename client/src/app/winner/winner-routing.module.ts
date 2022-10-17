
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WinnerComponent } from './winner.component';

const routes: Routes = [
    {
        path: '',
        component: WinnerComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WinnerRoutingModule {}
