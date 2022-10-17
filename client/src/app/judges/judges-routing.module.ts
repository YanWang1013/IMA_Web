
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JudgesComponent } from './judges.component';

const routes: Routes = [
    {
        path: '',
        component: JudgesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class JudgesRoutingModule {}
