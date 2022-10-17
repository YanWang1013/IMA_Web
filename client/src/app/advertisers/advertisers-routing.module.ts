
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvertisersComponent } from './advertisers.component';

const routes: Routes = [
    {
        path: '',
        component: AdvertisersComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdvertisersRoutingModule {}
