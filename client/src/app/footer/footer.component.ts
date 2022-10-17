
import { Component } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { UserService } from '../api/services/user.service';
import { StartupService } from '../api/services/startup.service';
@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
    public settings: any;
    public hideFooter = false;
    public pages: any;
    public footerRemove: string[] = ['/login', '/signup', '/forgot-password'];
    constructor(private router: Router,
        private userService: UserService,
        public startupService: StartupService) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                if (event.url.indexOf('/admin') === -1) {
                    this.hideFooter = !(this.footerRemove.indexOf(event.url) > -1);
                    this.getPages();
                }
            }
        });
    }
    
    ngOnInit() {
        this.settings = this.startupService.startupData();
    }

    getPages(): void {
        this.userService
            .getAllPages()
            .subscribe((response) => {
              if (response.data) {
                this.pages = response.data;
              }
            });
    }

    redirect(url: string): void {
        this.router.navigate([ url ]);
    }
}
