import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { getDisplaySpinner } from '../store/selectors';
import { LoadProfile } from '../store/actions';

@Component({
    selector: 'agencyapp-main-view',
    animations: [
        trigger('fadeInOut', [
            state('void', style({
                opacity: 0
            })),
            transition('void <=> *', animate(150)),
        ])
    ],
    templateUrl: './main-view.component.html',
    styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit, OnDestroy {

    isImageCarouselAvailable!: boolean;
    displaySpinner!: boolean;

    private subscription!: Subscription;

    constructor(
        private store: Store<IAppState>,
    ) {
        this.store.dispatch(new LoadProfile());
    }

    ngOnInit(): void {
        this.subscription = new Subscription();
        this.subscription.add(
            this.store
                .pipe(
                    select(getDisplaySpinner)
                )
                .subscribe((res: boolean) => this.displaySpinner = res)
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
