
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyproductsComponent } from './myproducts.component';

const routes: Routes = [
    {
        path: '',
        component: MyproductsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MyproductsRoutingModule {}
