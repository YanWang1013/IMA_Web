/**
 * The main component that renders single TabComponent
 * instances.
 */

import { 
    Component,
    ContentChildren,
    QueryList,
    AfterContentInit,
    Output
 } from '@angular/core';

import { TabComponent } from './tab.component';
import { EventEmitter } from '@angular/core';

@Component({
    selector: 'app-my-tabs',
    template: `
        <ul class="nav nav-tabs">
            <li
                *ngFor="let tab of tabs"
                (click)="selectTab(tab)"
                [class.active]="tab.active"
            >
                <a href="javascript:void(0)">{{ tab.title }}</a>
            </li>
        </ul>
        <ng-content></ng-content>
    `,
    styles: [
        `
            .tab-close {
                color: gray;
                text-align: right;
                cursor: pointer;
            }
        `
    ]
})
export class TabsComponent implements AfterContentInit {
    @Output() tabSelected = new EventEmitter<string>();

    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

    // contentChildren are set
    ngAfterContentInit() {
        // get all active tabs
        const activeTabs = this.tabs.filter((tab) => tab.active);

        // if there is no active tab set, activate the first
        if (activeTabs.length === 0) {
            this.selectTab(this.tabs.first);
        }
    }

    selectTab(tab) {
        // deactivate all tabs
        this.tabSelected.emit(tab.class);
        this.tabs.toArray().forEach((tabActive) => (tabActive.active = false));

        // activate the tab the user has clicked on.
        tab.active = true;
    }
}
