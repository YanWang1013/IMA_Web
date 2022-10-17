
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewprofileComponent } from './viewprofile.component';

const routes: Routes = [
    {
        path: '',
        component: ViewprofileComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ViewprofileRoutingModule {}
