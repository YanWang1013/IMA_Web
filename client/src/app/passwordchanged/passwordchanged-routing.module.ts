
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasswordchangedComponent } from './passwordchanged.component';

const routes: Routes = [
    {
        path: '',
        component: PasswordchangedComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PasswordchangedRoutingModule {}
