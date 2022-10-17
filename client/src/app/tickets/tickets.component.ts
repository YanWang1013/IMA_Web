import { Component, OnInit } from '@angular/core';
import { AppConst } from '../utils/app-const';
import { QueryParam } from '../api/models/query-param';
import { ToastService } from '../api/services/toast-service';
import { UserService } from '../api/services/user.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  public isNodata: boolean;
  public tickets: any;
  constructor(
    protected userService: UserService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getTickets();
  }

  getTickets(): void {
    this.toastService.showLoading();
    this.isNodata = true;
    const queryParam: QueryParam = {
        page: 1
    };
    this.userService.tickets(queryParam).subscribe((response) => {
        this.tickets = response;
        if (
            this.tickets.error &&
            this.tickets.error.code !==
                AppConst.SERVICE_STATUS.SUCCESS
        ) {
            this.toastService.error(this.tickets.error.message);
        } else {
            if (this.tickets.data.length !== 0) {
                this.isNodata = false;
            }
        }
        this.toastService.clearLoading();
    });
  }

  trackById(index: number, el: any): number {
      return el.id;
  }

}
