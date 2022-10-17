import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/services/user.service';
import { ToastService } from '../api/services/toast-service';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  pageData: any;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private toastService: ToastService) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          const slug = this.activatedRoute.snapshot.paramMap.get('type');
          this.getPage(slug);
        }
    });
    }

  ngOnInit(): void {

  }

  getPage(slug): void {
    this.toastService.showLoading();
    this.userService
        .getPageContent(slug)
        .subscribe((response) => {
          if (response.data) {
            this.pageData = response.data;
          }
          this.toastService.clearLoading();
        });
  }

}
