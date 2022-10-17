import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopViewComponent } from './shopview.component';

const routes: Routes = [
    {
        path: '',
        component: ShopViewComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShopViewRoutingModule {}
