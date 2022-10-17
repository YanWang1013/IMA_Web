import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../api/services/transaction.service';
import { QueryParam } from '../api/models/query-param';
import { ToastService } from '../api/services/toast-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-transaction',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
    public productTransactionData: [];
    public votePackageTransactionData: [];
    public instantTransactionData: [];
    public subscriptionTransactionData: [];
    public fundTransactionData: [];
    public searchForm: FormGroup;
    public original = 'original';
    public class = 'VotePackage';
    constructor(public transactionService: TransactionService,
        public toastService: ToastService, private formBuilder: FormBuilder,
        private ngbDateParserFormatter: NgbDateParserFormatter) {}

    ngOnInit(): void {
        this.searchForm = this.formBuilder.group(
            {
              q: [''],
              from: [''],
              to: ['']
            }
        );
        this.getTransactionDetails(this.class, this.searchForm.value);
    }

    tabSelected($event) {
        this.class = $event;
        this.getTransactionDetails(this.class, this.searchForm.value);
    }

    onSubmit() {
        const fromDate = this.searchForm.controls['from'].value;
        const fromMyDate = this.ngbDateParserFormatter.format(fromDate);
        const toDate = this.searchForm.controls['to'].value;
        const toMyDate = this.ngbDateParserFormatter.format(toDate);
        const formValues = this.searchForm.value;
        formValues['from'] = fromMyDate;
        formValues['to'] = toMyDate;
        this.getTransactionDetails(this.class, this.searchForm.value);
    }

    getTransactionDetails(paramclass: string, searchForm) {
        this.toastService.showLoading();
        const queryParam: QueryParam = {
            class: paramclass,
            q: searchForm.q,
            from: searchForm.from,
            to: searchForm.to
        };
        this.transactionService
            .getTransactionData(queryParam)
            .subscribe((data) => {
                this.toastService.clearLoading();
                if (paramclass === 'Product') {
                    this.productTransactionData = data.data;
                } else if (paramclass === 'VotePackage') {
                    this.votePackageTransactionData = data.data;
                } else if (paramclass === 'InstantPackage') {
                    this.instantTransactionData = data.data;
                } else if (paramclass === 'SubscriptionPackage') {
                    this.subscriptionTransactionData = data.data;
                } else if (paramclass === 'Fund') {
                    this.fundTransactionData = data.data;
                }
            });
    }
}
