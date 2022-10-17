import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../../../../api/services/crud.service';
import { ToastService } from '../../../../api/services/toast-service';
import { SessionService } from '../../../../api/services/session-service';
import { QueryParam } from '../../../../api/models/query-param';
import { AppConst } from '../../../../utils/app-const';
import * as dot from 'dot-object';
import {Location} from '@angular/common';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  public apiEndPoint: string;
  public menu: any;
  public responseData: any;
  public settings: any;

  constructor(private activatedRoute: ActivatedRoute,
    private crudService: CrudService,
    private toastService: ToastService,
    private sessionService: SessionService,
    private _location: Location,
    public router: Router) { }

    @Input('menu_detail')
    set meunItem(value: string) {
      if (value) {
        this.menu = value;
        this.getRecords();
      }
    }

    ngOnInit(): void {
    }

    getRecords() {
      const endPoint = this.menu.api + '/' + this.activatedRoute.snapshot.paramMap.get('id');
      this.toastService.showLoading();
        this.crudService.get(endPoint, null)
        .subscribe((response) => {
            this.responseData = response.data;
            const formatObj = {};
            dot.dot(this.responseData, formatObj);
            this.menu.view.fields.forEach(element => {
              if (element.type === 'select') {
                if (element.reference) {
                  let query = null;
                  if (element.query) {
                    query = {
                      class: element.query
                    };
                  }
                  this.crudService.get(element.reference, query)
                      .subscribe((responseRef) => {
                        element.options = responseRef.data;
                        // element.value = this.responseData[element.name].id;
                        let sel_op;
                        element.options.forEach(op => {
                          if (op.id === this.responseData[element.name]) {
                            sel_op = op;
                          }
                        });
                        if (sel_op) {
                          element.value = sel_op[element.option_name];
                        } else {
                          element.value = '';
                        }
                      });
                } else if (element.option_values) {
                  element.options = element.option_values.split(',');
                }
              } else if (element.type === 'tags') {
                if (element.reference) {
                  let query = null;
                  if (element.query) {
                    query = {
                      class: element.query
                    };
                  }
                  this.crudService.get(element.reference, query)
                      .subscribe((responseRef) => {
                        element.options = responseRef.data;
                        let sel_op = '';
                        this.responseData[element.name].forEach(op => {
                          sel_op += op.name + ', ';
                        });
                        element.value = sel_op.slice(0, -2);
                      });
                }
                // this.setTags(element);
              } else if (element.type === 'file') {
                element.value = '';
                element.class = (this.responseData['attachment'] && this.responseData['attachment']['class']) ? this.responseData['attachment']['class'] : '';
              } else if (element.type === 'date') {
                const [year, month, day] = this.responseData[element.name].split('-');
                const dob = { year: parseInt(year, 0), month: parseInt(month, 0), day: parseInt(day, 0) };
                element.value = dob;
              } else if (formatObj[element.name]) {
                element.value = formatObj[element.name];
              }
            });
            this.toastService.clearLoading();
        });
    }

    back() {
      this._location.back();
    }

}
