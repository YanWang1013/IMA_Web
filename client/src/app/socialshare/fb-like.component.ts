import { Component, ElementRef, AfterViewInit, Input } from '@angular/core';

@Component({
    selector: 'app-fb-like',
    template: `<div class="fb-share-button" [attr.data-href]="url" data-size="large" data-share="true"></div>`
})

export class FbLikeComponent implements AfterViewInit {
    @Input() url = location.href;

    constructor() {
        // initialise facebook sdk after it loads if required
        if (!window['fbAsyncInit']) {
            window['fbAsyncInit'] = function () {
                window['FB'].init({
                    appId: 'your-app-id',
                    autoLogAppEvents: true,
                    xfbml: true,
                    version: 'v3.0'
                });
            };
        }

        // load facebook sdk if required
        const url = 'https://connect.facebook.net/en_US/sdk.js';
        if (!document.querySelector(`script[src='${url}']`)) {
            const script = document.createElement('script');
            script.src = url;
            document.body.appendChild(script);
        }
    }

    ngAfterViewInit(): void {
        // render facebook button
        // tslint:disable-next-line:no-unused-expression
        window['FB'] && window['FB'].XFBML.parse();
    }
}
