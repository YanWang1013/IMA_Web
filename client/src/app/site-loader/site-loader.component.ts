
import { Component } from '@angular/core';
import { ToastService } from '../api/services/toast-service';
@Component({
    selector: 'app-site-loader',
    templateUrl: './site-loader.component.html',
    styleUrls: ['./site-loader.component.scss']
})
export class SiteLoaderComponent {
    constructor(public toastService: ToastService) {}
}
