import { Component, ElementRef, AfterViewInit, Input } from '@angular/core';

@Component({
    selector: 'app-google-plus',
    template: `<div class="g-plusone" [attr.data-href]="url" data-size="medium"></div>`
})

export class GooglePlusComponent implements AfterViewInit {
    @Input() url = location.href;

    constructor() {
        // load google plus sdk if required
        const url = 'https://apis.google.com/js/platform.js';
        if (!document.querySelector(`script[src='${url}']`)) {
            const script = document.createElement('script');
            script.src = url;
            document.body.appendChild(script);
        }
    }

    ngAfterViewInit(): void {
        // render google plus button
        // tslint:disable-next-line:no-unused-expression
        window['gapi'] && window['gapi'].plusone.go();
    }
}
