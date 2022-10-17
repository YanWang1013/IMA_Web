
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SessionService } from '../../../api/services/session-service';
import { StartupService } from '../../../api/services/startup.service';
import { ToastService } from '../../../api/services/toast-service';
import { UserService } from 'src/app/api/services/user.service';
import { AppConst } from 'src/app/utils/app-const';
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isActive: boolean;
    collapsed: boolean;
    showMenu: string;
    pushRightClass: string;
    settings: any;
    menus: any;
    session: any;
    @Output() collapsedEvent = new EventEmitter<boolean>();

    constructor(private translate: TranslateService,
        public router: Router,
        private sessionService: SessionService,
        public startupService: StartupService,
        private userService: UserService,
        private toastService: ToastService) {
        this.router.events.subscribe((val) => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.isActive = false;
        this.collapsed = false;
        this.showMenu = '';
        this.pushRightClass = 'push-right';
        this.settings = this.startupService.startupData();
        this.session = JSON.parse(sessionStorage.getItem('user_context'));
        this.menus = this.settings.MENU.filter((e) => (!e.role_id || e.role_id.indexOf(this.session.role.id) > -1)); 
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

    redirect(url: string): void {
        if (url === '/admin/actions/logout') {
            this.logout();
        } else if (url) {
            this.router.navigate([ url ]);
        }
    }

    logout(): void {
        this.userService.logout().subscribe((response) => {
            if (
                response.error &&
                response.error.code === AppConst.SERVICE_STATUS.SUCCESS
            ) {
                sessionStorage.removeItem('user_context');
                sessionStorage.removeItem('login_time');
                sessionStorage.removeItem('access_token');
                sessionStorage.removeItem('refresh_token');
                this.router.navigate(['/']);
                setTimeout(() => {
                    location.reload();
                }, 100);
            } else {
                this.toastService.error(response.error.message);
            }
            this.toastService.clearLoading();
        });
    }
}
