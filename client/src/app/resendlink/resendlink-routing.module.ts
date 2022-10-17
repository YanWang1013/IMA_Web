
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResendlinkComponent } from './resendlink.component';

const routes: Routes = [
    {
        path: '',
        component: ResendlinkComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ResendlinkRoutingModule {}
