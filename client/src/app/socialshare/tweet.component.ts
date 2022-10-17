import { Component, ElementRef, AfterViewInit, Input } from '@angular/core';

@Component({
    selector: 'app-tweet',
    template: `<a href="https://twitter.com/share" [attr.data-text]="text" [attr.data-url]="url" class="twitter-share-button"></a>`
})

export class TweetComponent implements AfterViewInit {
    @Input() url = location.href;
    @Input() text = '';

    constructor() {
        // load twitter sdk if required
        const url = 'https://platform.twitter.com/widgets.js';
        if (!document.querySelector(`script[src='${url}']`)) {
            const script = document.createElement('script');
            script.src = url;
            document.body.appendChild(script);
        }
    }

    ngAfterViewInit(): void {
        // render tweet button
        // tslint:disable-next-line:no-unused-expression
        window['twttr'] && window['twttr'].widgets.load();
    }
}