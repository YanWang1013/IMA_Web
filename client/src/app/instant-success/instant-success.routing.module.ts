
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstantSuccessComponent } from './instant-success.component';

const routes: Routes = [
    {
        path: '',
        component: InstantSuccessComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InstantSuccessRoutingModule {}
