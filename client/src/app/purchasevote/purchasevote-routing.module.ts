
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchasevoteComponent } from './purchasevote.component';

const routes: Routes = [
    {
        path: '',
        component: PurchasevoteComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PurchasevoteRoutingModule {}
