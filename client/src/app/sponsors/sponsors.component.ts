import { Component, OnInit } from '@angular/core';
import { ToastService } from '../api/services/toast-service';
import { AdvertiserService } from '../api/services/advertisers.service';
import { AdvertisementList } from '../api/models/advertisement-list';
import { AppConst } from '../utils/app-const';
import { BaseComponent } from '../base.component';
import { QueryParam } from '../api/models/query-param';
declare var $: any;

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss']
})
export class SponsorsComponent extends BaseComponent implements OnInit {
  public advertisementList: AdvertisementList;
  public isNodata: boolean;
  public titleSponser: any;
  constructor(
      private advertiserService: AdvertiserService,
      private toastService: ToastService
  ) {
      super();
  }

  ngOnInit(): void {
    this.getAdvertisers();
    $(document).ready(function () {
      $(".clsclientBlock").slick({
        dots: false,
        infinite: true,
        speed: 1e3,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3e3,
        arrows: false,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2,
              arrows: !1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              arrows: !1
            }
          },
          {
            breakpoint: 400,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: !1
            }
          }
        ]
      });
    });
  }

  getAdvertisers(): void {
    this.toastService.showLoading();
    this.isNodata = true;
    const queryParam: QueryParam = {
        page: 1,
        sortby: 'desc'
    };
    this.advertiserService.getAll(queryParam).subscribe((data) => {
        this.advertisementList = data;
        if (
            this.advertisementList.error &&
            this.advertisementList.error.code !==
                AppConst.SERVICE_STATUS.SUCCESS
        ) {
            this.toastService.error(this.advertisementList.error.message);
        } else {
            if (!this.advertisementList.data || this.advertisementList.data.length !== 0) {
                this.isNodata = false;
                // this.titleSponser = this.advertisementList.data.find((e) => (e.id === 1));
                this.titleSponser = this.advertisementList.data[0];
            }
        }
        this.toastService.clearLoading();
    });
}

}
