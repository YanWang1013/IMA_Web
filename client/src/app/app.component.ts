import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './api/services/session-service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(
        private sessionService: SessionService,
        public router: Router

    ) {
        this.sessionService.isLogined();
        this.router.events.subscribe((val) => {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;

          });
    }
}
