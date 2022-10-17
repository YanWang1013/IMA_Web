
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductSuccessComponent } from './product-success.component';

const routes: Routes = [
    {
        path: '',
        component: ProductSuccessComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductSuccessRoutingModule {}
